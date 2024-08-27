import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../authContext/AuthProvider";
import { useEffect, useState } from "react";

const UserRoutes = () => {
  const { user, loading } = useAuth(); // Assume useAuth provides a loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
    }
  }, [loading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return user.roles === 1 ? <Outlet /> : <Navigate to="/signin" />;
  }

  return <Navigate to="/signin" />;
};

export default UserRoutes;
