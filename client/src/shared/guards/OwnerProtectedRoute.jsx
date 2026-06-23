import { Navigate } from "react-router-dom";
import { useAuth } from "../context/CustomerAuthContext";

const OwnerProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (
    !user ||
    !user.roles?.includes("OWNER")
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default OwnerProtectedRoute;