import { jwtDecode } from "jwt-decode";
import { $host, $authHost } from "./index.js";

export const registration = async (email, password) => {
    const {data} = await $host.post("api/user/registration", {email, password})
    localStorage.setItem("token", data.token)
    return jwtDecode(data.token);
}

export const login = async (email, password) => {
    const {data} = await $host.post("api/user/login", {email, password})
    localStorage.setItem("token", data.token)
    console.log(jwtDecode(data.token));    

    return jwtDecode(data.token);
}

export const check = async () => {
    try {
        const response = await $authHost.get("api/user/auth");
        console.log("checl",response);
        return response;
    } catch (error) {
        return error.response;
    }
};
