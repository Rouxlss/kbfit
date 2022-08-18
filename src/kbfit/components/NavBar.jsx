import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loading } from "./";
import Cookies from "js-cookie";
import { useEffect } from "react";

export const NavBar = () => {

    const { logoutUser, isLoading, user, token } = useContext(UserContext);
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        console.log("logout", token);
        const isValidLogout = await logoutUser(token);
        isValidLogout && navigate("/auth/login");
    };

    return (
        <>
            { isLoading && <Loading /> }
            <ToastContainer />
            <header>
                <nav>
                    <div className="header__logo">
                        <Link to="/">
                            <p>KB4IT</p>
                        </Link>
                    </div>

                    <ul>
                        <a href="#">
                            <li>Help Center</li>
                        </a>
                        <a href="#">
                            <li>PnP</li>
                        </a>
                        <a href="#">
                            <li>How-to</li>
                        </a>
                        <a href="#">
                            <li>Troubleshoot</li>
                        </a>
                        <a onClick={handleLogout} className="header__lastbtn">
                            <li>Logout</li>
                        </a>
                    </ul>
                </nav>
            </header>
            <div className="subheader">
                <p>Welcome {user.userName}</p>
            </div>
        </>
    );
};
