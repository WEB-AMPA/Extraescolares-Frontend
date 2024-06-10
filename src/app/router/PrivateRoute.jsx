import React from 'react';
import { useAuthContext } from '../context/authContext';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ({ roles }) => {
  const { isAuth, role } = useAuthContext();

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
