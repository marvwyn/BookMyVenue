import { Navigate } from "react-router-dom";

import { useAuth } from "../context/CustomerAuthContext";

import { ROUTES } from "../constants/routes";

const CustomerProtectedRoute = ({
  children,
}) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
      />
    );
  }

  const isOwner =
    user.roles?.includes("OWNER");

  if (isOwner) {
    return (
      <Navigate
        to={ROUTES.OWNER}
        replace
      />
    );
  }

  return children;
};

export default CustomerProtectedRoute;