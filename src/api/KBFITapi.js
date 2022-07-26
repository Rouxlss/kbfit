import axios from 'axios';

export const KBFITapi = axios.create({
    baseURL: `https://kbfit.herokuapp.com/api/v1`,
});