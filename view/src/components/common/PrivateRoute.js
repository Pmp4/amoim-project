import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    useEffect(() => {
        if(!Boolean(localStorage.getItem("logged"))) {
            alert("로그인 후, 이용해주세요.");
            return;
        }
    })

    return !Boolean(localStorage.getItem("logged")) ? <Navigate to="/"/> : <div>{children}</div>
    // return (
    //     <div>{!Boolean(localStorage.getItem("logged") && children}</div>
    // );
};

export default PrivateRoute;
