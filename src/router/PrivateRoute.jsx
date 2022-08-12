import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context';

export const PrivateRoute = ({children}) => {

    const { isLoggedIn } = useContext(UserContext);
    const {pathname, search} = useLocation();
    console.log(pathname, search);

    return (isLoggedIn) ? children : <Navigate to="/auth/login"/>;
    
}
