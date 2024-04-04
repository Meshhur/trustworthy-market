import jwt from "jsonwebtoken"
import env from "dotenv"

env.config()
export default function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Not authorized"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        console.log("ERROR:",error);
        return res.status(401).json({message: "Not authorized"})
    }
}

// CREATE DATABASE trustdata;
// CREATE ROLE my_app_role WITH LOGIN PASSWORD 'some_password';
// GRANT ALL PRIVILEGES ON DATABASE "my_app" TO my_app_role;static-page-serve