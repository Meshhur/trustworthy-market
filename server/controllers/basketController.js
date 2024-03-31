import models from "../models/models.js";
import ApiError from "../error/ApiError.js";

class basketController {
    async create(req, res, next) {
        try {
            var { basketId, deviceId } = req.body;

            const basket_order = await models.BasketDevice.create({ basketId, deviceId });

            return res.json(basket_order);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }
    async removeItem(req, res, next) {
        try {
            const { basketId, deviceId } = req.params;
            await models.BasketDevice.destroy({
                where: {
                    basketId: basketId,
                    deviceId: deviceId
                }
            });
            return res.status(204).send(); // 204 No Content
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async clearBasket(req, res, next) {
        try {
            const { basketId } = req.params;
            await models.BasketDevice.destroy({
                where: {
                    basketId: basketId
                }
            });
            return res.status(204).send(); // 204 No Content
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async getBasketItems(req, res, next) {
        var { basketId } = req.params
        var basketItems;


        if (basketId) {
            basketItems = await models.BasketDevice.findAll({
                where: { basketId: basketId },
                include: [{ model: models.Device }]
            })
        }
        basketItems = basketItems.map(item => item.device)
        return res.json(basketItems)
    }
}

export default new basketController();