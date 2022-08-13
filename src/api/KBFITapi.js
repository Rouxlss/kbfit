import axios from 'axios';
import Cookies from "js-cookie";

export const KBFITapi = axios.create({
    // baseURL: `http://localhost:4000/api/v1`,
    // baseURL: `https://kfi-backend.vercel.app/api/v1`,
    baseURL: `https://kfi-api.ga/api/v1`,
    withCredentials: true
});
