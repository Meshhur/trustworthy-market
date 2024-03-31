import models from "../models/models.js"
import ApiError from "../error/ApiError.js"
const Brand = models.Brand
class BrandController {
    async create(req, res) {
        const { name } = req.body
        const brand = await Brand.create({name})
        return res.json(brand) 
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }
}

export default new BrandController()