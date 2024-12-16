import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        // Handle authentication checks and delay rendering
        if (authStatus === null) {
            setLoader(true);
        } else if (authentication && !authStatus) {
            navigate("/login");
        } else if (!authentication && authStatus) {
            navigate("/");
        }
        setLoader(false);
    }, [authStatus, navigate, authentication]);

    if (loader) {
        return <div>Loading...</div>; // Show a loader until authentication is confirmed
    }

    return <>{children}</>;
}
