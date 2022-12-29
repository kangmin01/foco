import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLogin } from '../util/isLogin';

interface RequireAuthProps {
  children: Object;
}

export const PrivateRoute = ({ children }: RequireAuthProps) => {
  if (isLogin() === true) {
    return <>{children}</>;
  } else {
    alert('Only for logged in users');
    return <Navigate to="/login" />;
  }
};
