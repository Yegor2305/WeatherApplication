import { instance } from "../api/axios.api.ts"
import {IUserData, IUser} from "../types/types.ts";

export const AuthService = {
    async register(userData : IUserData) : Promise<IUser> {
        const {data} = await instance.post<IUser>("/auth/register", userData);
        return data;
    },
    async login(userData : IUserData) : Promise<IUser> {
        const {data} = await instance.post<IUser>("/auth/login", userData);
        console.log(data);
        return data;
    },
    async getProfile() : Promise<IUser | undefined> {
        const {data} = await instance.get<IUser>("/auth/profile");
        if (data) return data;
    },
}