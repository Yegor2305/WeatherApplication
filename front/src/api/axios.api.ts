import axios from "axios";
import {getTokenFromLocalStorage} from "../services/localStorageManager.ts";

export const instanceAuth = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`,
    headers: {
        Authorization: 'Bearer ' + getTokenFromLocalStorage(),
    }
})

export const instanceGeneral = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`,
    headers: {}
})