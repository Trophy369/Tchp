import { Outlet, Navigate } from "react-router-dom";
<<<<<<< HEAD
import { useAuth } from "../authContext/AuthProvider";

const UserRoutes = () => {
  const { user } = useAuth();

  if (user && user.roles !== null) {
=======
import { useSelector } from 'react-redux';

const UserRoutes = () => {
  const { user } = useSelector((state) => state.user);

  if (user) {
>>>>>>> 6c8515be898ddd2e8ff2c16370f7a63a0ff542c1
    return user.roles === 1 ? <Outlet /> : <Navigate to="/signin" />;
  } else {
    return <Navigate to="/signin" />;
  }
};

export default UserRoutes;