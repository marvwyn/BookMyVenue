import { Navigate } from "react-router-dom";
import { useAuth } from "../context/CustomerAuthContext";

const CustomerProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default CustomerProtectedRoute;