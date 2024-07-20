import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./context/authcontext";

const PrivateRoutes = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    useEffect(() => {
        //console.log(isLoggedIn);
        if (!isLoggedIn) {
            navigate('/signup');
        }
    }, [isLoggedIn, navigate]);

    return isLoggedIn ? <Outlet /> : null;
};

export default PrivateRoutes;
