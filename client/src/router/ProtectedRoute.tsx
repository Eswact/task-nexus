import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/authService";

const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      setIsAuth(authenticated);
    };
    checkAuth();
  }, []);

  if (isAuth === null) return <div>Loading...</div>;
  return isAuth ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
