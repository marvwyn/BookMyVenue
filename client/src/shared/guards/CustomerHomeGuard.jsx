import { Navigate } from "react-router-dom";
import { useAuth } from "../context/CustomerAuthContext";

const CustomerHomeGuard = ({ children }) => {
  const { user } = useAuth();

  if (user?.activeRole === "OWNER") {
    return <Navigate to="/owner" replace />;
  }

  return children;
};

export default CustomerHomeGuard;