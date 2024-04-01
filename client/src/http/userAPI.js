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
    const {data} = await $authHost.get("api/user/auth")
    localStorage.setItem("token", data.token)
    return jwtDecode(data.token)
}