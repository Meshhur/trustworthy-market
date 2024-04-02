import axios from "axios";
// import env from "dotenv"

// env.config()
const $host = axios.create({
    baseURL: "http://18.188.154.142/:7000/",
})

const $authHost = axios.create({
    baseURL: "http://18.188.154.142/:7000/",
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}