import models from "../models/models.js";
import ApiError from "../error/ApiError.js";
import { Op } from 'sequelize';


class searchController {

    async searchItems(req, res, next) {
        const { searchTerm } = req.query;
        if (!searchTerm) {
            return next(ApiError.badRequest("No search query provided"));
        }
        try {
            const devices = await models.Device.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${searchTerm}%`
                    }
                }
            });
            return res.json(devices);
        } catch (error) {
            console.error("Database query error: ", error);

            next(ApiError.internal(error.message));
        }

    }
}

export default new searchController();