import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../authContext/AuthProvider";

const UserRoutes = () => {
  const { user } = useAuth();

  if (user && user.roles !== null) {
    return user.roles === 1 ? <Outlet /> : <Navigate to="/signin" />;
  } else {
    return <Navigate to="/signin" />;
  }
};

export default UserRoutes;