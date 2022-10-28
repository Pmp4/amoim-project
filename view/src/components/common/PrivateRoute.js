import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(!Boolean(localStorage.getItem("logged"))) {
            alert("로그인 후, 이용해주세요.");
            navigate("/");
            return;
        }
    })

    return <div>{children}</div>;
};

export default PrivateRoute;
