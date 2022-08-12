import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context';

export const PublicRoute = ({children}) => {

    const { isLoggedIn } = useContext(UserContext);

    return (!isLoggedIn) ? children : <Navigate to="/"/>;
    
}
