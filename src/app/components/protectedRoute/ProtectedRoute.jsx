import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({permission, children, redirectTo='/'}) => {
 
  if (!permission) return <Navigate to={redirectTo}/>
  return children ? children : <Outlet />
}

export default ProtectedRoute