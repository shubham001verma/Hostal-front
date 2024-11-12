import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    // Check if the token exists, if not redirect to login
    return token ? children : <Navigate to="/login" />;
};

export default AuthRoute;