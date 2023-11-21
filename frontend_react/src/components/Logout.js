import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice"; // Assicurati che il percorso sia corretto
import { useNavigate } from "react-router-dom";

function Logout() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());


        sessionStorage.removeItem("token");


        navigate("/login");
    };

    const handleCancel = () => {

        navigate("/");
    };

    return (
        <div className="content">
            <h2>{user.username} vuoi effettuare il logout?</h2>
            <button onClick={handleLogout}>Sì</button>
            <button onClick={handleCancel}>No</button>
        </div>
    );
}

export default Logout;
