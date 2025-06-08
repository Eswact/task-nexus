import React, { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/authService";

const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      setIsAuth(authenticated);
    };
    checkAuth();
  }, []);

  if (isAuth === null) return <div>Loading...</div>;
  return isAuth ? element : <Navigate to={`login${location.search}`} />;
};

export default ProtectedRoute;
