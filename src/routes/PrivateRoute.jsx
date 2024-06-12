import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';

const PrivateRoute = ({ children }) => {
  const { auth } = useAuthContext();
  return auth.isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;



