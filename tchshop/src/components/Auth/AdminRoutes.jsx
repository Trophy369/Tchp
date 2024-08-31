import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const AdminRoutes = () => {
  const { user } = useSelector((state) => state.user);
 

  if (user) {
    return user.roles === 2 ? <Outlet /> : <Navigate to="/signin" />;
  }

  return <Navigate to="/signin" />;
};

export default AdminRoutes;