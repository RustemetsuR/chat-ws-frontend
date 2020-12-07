import React from 'react';
import { Redirect } from 'react-router-dom';

const RedirectToHome = () => {
    return (
        <>
            <Redirect to='/register'/>
        </>
    );
};

export default RedirectToHome;