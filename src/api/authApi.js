import { api } from "./axios";

export const loginRequest = async (email, password) => {
    return api.post("auth/login",{email,password});
}

export const refreshRequest = () => {
    return api.post("auth/refresh");

}