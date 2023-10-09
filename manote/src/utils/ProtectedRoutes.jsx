import React from 'react';
import { useCookies } from 'react-cookie';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const [cookies, setCookies] = useCookies();

  return cookies.ref_token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
