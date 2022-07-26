import React from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
    return (
        <>
            <header>
                <nav>
                    <div className="header__logo">
                        <Link to='/'>
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
                        <a className="header__lastbtn" href="#">
                            <li>Troubleshoot</li>
                        </a>
                    </ul>
                </nav>
            </header>
            <div className="subheader">
                <p>Welcome Name @ companyname</p>
            </div>
        </>
    );
};
