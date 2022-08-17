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
    isLoading: false,
    token: undefined
}

const init = () => {

    const token = Cookies.get("accessToken");

    if (token) {
        
        const tokenData = getToken(token);
        
        const { user } = tokenData;
        
        return {
            isLoggedIn: true,
            user,
            isLoading: false,
            token
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

            const { data } = await KBFITapi.get("/auth/validate-token", {
                headers: {
                    Authorization: Cookies.get("accessToken")
                }
            });
            const { token, user } = await data;
 
            dispatch({ type: '[Auth] - Login', payload: { user, isLoading: false, token } });
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
            dispatch({ type: '[Auth] - Login', payload: { user, isLoading: false, token } });

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

    const logoutUser = async (token) => {

        try {

            dispatch({ type: "LOADING" });

            await await KBFITapi.post("/auth/logout", {}, { headers: { Authorization: token } });

            Cookies.remove("accessToken");
            dispatch({ type: '[Auth] - Logout'});

            return true;

        } catch (error) {
            
            dispatch({ type: "ERROR" });

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
