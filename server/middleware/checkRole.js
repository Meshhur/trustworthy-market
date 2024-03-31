import jwt from "jsonwebtoken";
import env from "dotenv"

env.config()
function checkRole(role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(401).json({ message: "Not authorized" })
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.role !== role) {
                return res.status(403).json({message: "Access denied"})
            }
            req.user = decoded
            next()
        } catch (error) {
            console.log("not auth");
            return res.status(401).json({ message: "Not authorized" })
        }
    }
}

export default checkRole