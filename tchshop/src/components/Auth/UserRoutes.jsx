import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../authContext/AuthProvider";
import { useState, useEffect } from "react";

const UserRoutes = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user && user.roles !== null) {
    return user.roles === 1 ? <Outlet /> : <Navigate to="/signin" />;
  } else {
    return <Navigate to="/signin" />;
  }
};

export default UserRoutes;