import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen text-black dark:text-white-dark">
            {children} <ToastContainer />{' '}
        </div>
    );
};

export default AuthLayout;
