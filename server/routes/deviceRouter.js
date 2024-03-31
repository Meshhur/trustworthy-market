import Router from "express"
import deviceController from "../controllers/deviceController.js"
import checkRole from "../middleware/checkRole.js"

const router = new Router()

router.post("/", checkRole("ADMIN"), deviceController.create)
router.get("/", deviceController.getAll)
router.get("/:id", deviceController.getOne)
router.patch("/:id",checkRole("ADMIN"), deviceController.updateProduct)


export default router;


// Ordering system
// User is able place orders with quantities
// User is able to track orders
// Admins are able to see placed orders
// Admins are able to edit the orders