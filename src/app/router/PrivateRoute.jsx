import React from 'react'
import { useAuthContext } from '../context/authContext'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

const PrivateRoute = () => {
  const { isAuth } = useAuthContext()
  if (!isAuth) {
    return <Navigate to="/login" />
  }
  return (
    <><Outlet /></>
  )
}

export default PrivateRoute