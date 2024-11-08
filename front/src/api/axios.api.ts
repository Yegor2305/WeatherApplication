import axios from "axios";
import {getTokenFromLocalStorage} from "../services/localStorageManager.ts";

export const instance = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`,
    headers: {
        Authorization: 'Bearer ' + getTokenFromLocalStorage(),
    }

})