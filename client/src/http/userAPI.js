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
        console.log("Check etjek bolyas");
        const response = await $authHost.get("api/user/auth");
        console.log("Response baarde", response);
        return response;
    } catch (error) {
        console.log("Error", error);
        // If you need to return the error response:
        return error.response;
        // Or, if you prefer, you can throw the error to be handled by the caller
        // throw error;
    }
};
