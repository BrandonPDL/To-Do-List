import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ component: Component }) => {
  const user = useSelector((state) => state.auth);


  const location = useLocation();
  if (!user.isAuthenticated ) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  else
    {
      return <Component />;
    }
  
};

export default PrivateRoute;