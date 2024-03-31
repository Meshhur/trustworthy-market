import Router from "express";
import basketController from "../controllers/basketController.js";

const router = new Router();

router.post("/", basketController.create);
router.get("/:basketId", basketController.getBasketItems);
router.delete("/:basketId/device/:deviceId", basketController.removeItem); // Route to remove a single item from the basket
router.delete("/:basketId/clear", basketController.clearBasket); // Route to clear the entire basket

export default router;