import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';
import { Outlet } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { auth } = useAuthContext();
  if(!auth.isAuth) <Navigate to="/login" />;

  return <Outlet />
};

export default PrivateRoute;



