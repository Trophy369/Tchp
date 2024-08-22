import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../authContext/AuthProvider";

const AdminRoutes = () => {
  const { user } = useAuth();

  if (user && user.roles !== null) {
    return user.roles === 2 ? <Outlet /> : <Navigate to="/signin" />;
  } else {
    return <Navigate to="/signin" />;
  }
};

export default AdminRoutes;