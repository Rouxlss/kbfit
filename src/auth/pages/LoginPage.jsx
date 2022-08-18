import React, { useContext } from "react";
import "./../loginStyles.css";
import LoginImg from "./../img/log.svg";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context";
import { Loading } from "../../kbfit/components/";

export const LoginPage = () => {

    const navigate = useNavigate();

    const { loginUser, isLoading } = useContext(UserContext);
    const [userLogin, setUserLogin] = useState({ email: "admin@admin.com", password: "123" });
    const { email, password } = userLogin;

    const onLogin = async (e) => {
        e.preventDefault();
        const isValidLogin = await loginUser({ email, password });
        isValidLogin && setTimeout(() => {
            navigate("/")
        }, 2000);
        
    };

    return (
        <>
        { isLoading && <Loading /> }   
        <div className="container-login">
            <ToastContainer/>
            <div className="forms-container">
                <div className="signin-signup">
                    <form
                        onSubmit={onLogin}
                        className="sign-in-form"
                        autoComplete="new-password"
                    >
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input
                                type="text"
                                value={email}
                                
                                name="email"
                                onChange={(e) =>
                                    setUserLogin({ ...userLogin, email: e.target.value })
                                }
                                placeholder="Username"
                            />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                name="password"
                                
                                value={password}
                                onChange={(e) =>
                                    setUserLogin({
                                        ...userLogin,
                                        password: e.target.value,
                                    })
                                }
                                placeholder="Password"
                            />
                        </div>
                        <input
                            type="submit"
                            value="Login"
                            className="btn solid"
                        />
                    </form>
                    {/* <form action="#" className="sign-up-form">
                        <h2 className="title">Sign up</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" />
                        </div>
                        <input type="submit" className="btn" value="Sign up" />
                    </form> */}
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>KB4IT</h3>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Debitis, ex ratione. Aliquid!
                        </p>
                        <button className="btn transparent" id="sign-up-btn">
                            Sign up
                        </button>
                    </div>
                    <img src={LoginImg} className="image" alt="" />
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>One of us ?</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Nostrum laboriosam ad deleniti.
                        </p>
                        <button className="btn transparent" id="sign-in-btn">
                            Sign in
                        </button>
                    </div>
                    {/* <img src="img/register.svg" className="image" alt="" /> */}
                </div>
            </div>
        </div>
        </>
    );
};
