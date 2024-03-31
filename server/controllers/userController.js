import ApiError from "../error/ApiError.js";
import bcrypt from "bcrypt";
import models from "../models/models.js";
import jwt from 'jsonwebtoken';
import env from "dotenv"

env.config()

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: "24h"}
    )
}
class UserController {
    async registration(req, res, next) {
        const { email, password, role } = req.body
        if (!email || !password) {
                
        }

        const candidate = await models.User.findOne({ where: { email } })
        if (candidate) {
            return next(ApiError.badRequest("Email is being used"))
        }

        const hashPassword = await bcrypt.hash(password, 6)
        const user = await models.User.create({ email, role, password: hashPassword })
        const basket = await models.Basket.create({ userId: user.id })
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await models.User.findOne({where:{email}})
        if (!user) {
            return next(ApiError.internal("User is not found"))
        }
        let comparePassword = bcrypt.compareSync(password, user.dataValues.password)
        if (!comparePassword) {
            return next(ApiError.internal("Incorrect password"))
        }
        const token = generateJwt(user.dataValues.id, user.dataValues.email, user.dataValues.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

export default new UserController()