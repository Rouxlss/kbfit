import axios from 'axios';

export const KBFITapi = axios.create({
    baseURL: `https://kfi-api.ga/api/v1`,
    withCredentials: true
});