import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { v4 as uuidv4 } from "uuid";
import path from "path";
import models from "../models/models.js";
import ApiError from "../error/ApiError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class DeviceController {
    async create(req, res, next) {
        try {
            var { name, price, brandId, typeId, info } = req.body;
            const { img } = req.files;

            // Generate a unique filename
            const fileName = `${uuidv4()}.jpg`;
            // Construct the correct path
            const filePath = path.resolve(__dirname, "..", "static", fileName);
            // Move the uploaded file to the correct path
            await img.mv(filePath);
            // Create a new Device with the file information
            const device = await models.Device.create({ name, price, brandId, typeId, img: fileName });
            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    models.DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }
            return res.json(device);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async getAll(req, res) {
        var { typeId, brandId, limit, page } = req.query
        page = page || 1
        var limit = limit || 9
        let offset = page * limit - limit
        var devices;

        if (!brandId && !typeId) {
            devices = await models.Device.findAndCountAll({ limit, offset })
        }
        if (brandId && !typeId) {
            devices = await models.Device.findAndCountAll({ where: { brandId }, limit, offset })
        }
        if (!brandId && typeId) {
            devices = await models.Device.findAndCountAll({ where: { typeId }, limit, offset })
        }
        if (brandId && typeId) {
            devices = await models.Device.findAndCountAll({ where: { typeId, brandId }, limit, offset })
        }
        return res.json(devices)
    }

    async getOne(req, res) {
        // Implementation for getOne
        const { id } = req.params

        const device = await models.Device.findOne({
            where: { id },
            include: [{ model: models.DeviceInfo, as: "info" }]
        })
        return res.json(device)
    }

    async updateProduct(req, res, next) {
        try {
            const { id } = req.params;
            const { name, price, brandId, typeId, info } = req.body;
            let updatedData = {};

            if (name) updatedData.name = name;
            if (price) updatedData.price = price;
            if (brandId) updatedData.brandId = brandId;
            if (typeId) updatedData.typeId = typeId;

            if (req.files.img) {
                const { img } = req.files;
                const fileName = `${uuidv4()}.jpg`;
                const filePath = path.resolve(__dirname, "..", "static", fileName);

                await img.mv(filePath);

                updatedData.img = fileName;
            }

            const device = await models.Device.update(updatedData, {
                where: { id }
            });

            if (info) {
                const parsedInfo = JSON.parse(info);
                await models.DeviceInfo.destroy({ where: { deviceId: id } }); // Remove existing info

                parsedInfo.forEach(async i => {
                    await models.DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: id
                    });
                });
            }

            // const updatedDevice = await models.Device.findByPk(id, {
            //     include: [{ model: models.DeviceInfo, as: "info" }]
            // });

            // return res.json(updatedDevice);
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async deleteTheDevice(req, res) {
        try {
            const { id } = req.params
            await models.Device.destroy({ where: { id: id } })
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }
}

export default new DeviceController();