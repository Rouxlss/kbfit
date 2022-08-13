import { useEffect, useReducer } from "react";
import { UserContext } from "./UserContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { KBFITapi } from "../../api";
import { userReducer } from "./userReducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../../hooks/getToken";

const USER_INITIAL_STATE = {
    isLoggedIn: false,
    user: undefined,
    isLoading: false
}

const init = async () => {

    const token = await Cookies.get("accessToken");
    KBFITapi.defaults.headers.common["Authorization"] = token;
    
    if (token) {
        
        const tokenData = getToken(token);
        
        const { user } = tokenData;
        
        return {
            isLoggedIn: true,
            user,
            isLoading: false
        }

    } else {
        return USER_INITIAL_STATE;
    }

}

export const UserProvider = ({ children }) => {

    const navigate = useNavigate();
    const [userState, dispatch] = useReducer(userReducer, {}, init);
    
    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {

        if (!Cookies.get("accessToken")) {
            navigate("/auth/login");
            return;
        }

        try {
            const { data } = await KBFITapi.get("/auth/validate-token");
            const { token, user } = await data;
            KBFITapi.defaults.headers.common["Authorization"] = token;
            
            dispatch({ type: '[Auth] - Login', payload: { user, isLoading: false } });
            Cookies.set("accessToken", token);
            return true;

        } catch (error) {

            dispatch({ type: '[Auth] - Logout'});

            navigate("/auth/login");
            Cookies.remove("accessToken");
            return false;

        }
    };

    const loginUser = async ({ email, password }) => {

        try {

            dispatch({ type: "LOADING" });

            const data = await KBFITapi.post("/auth/login", { email, password });
            const {message, token, user} = data.data;
            Cookies.set("accessToken", token);

            KBFITapi.defaults.headers.common["Authorization"] = token;

            dispatch({ type: '[Auth] - Login', payload: { user, isLoading: false } });

            toast.success(message, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });


            return true;

        } catch (error) {

            const { message } = error.response.data;

            dispatch({ type: "ERROR" });

            toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            return false;
        }
    }

    const logoutUser = async () => {

        try {

            dispatch({ type: "LOADING" });
            const data = await KBFITapi.post("/auth/logout");
            Cookies.remove("accessToken");
            dispatch({ type: '[Auth] - Logout'});

            return true;

        } catch (error) {
            
            const { message } = error.response.data;

            toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            return false;

        }

    }

    return (
        <UserContext.Provider value={{ ...userState, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};
