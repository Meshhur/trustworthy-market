import Router from "express"
import UserController from "../controllers/userController.js"
import auth from "../middleware/auth.js"

const router = new Router()

router.post("/registration",UserController.registration)
router.post("/login", UserController.login)
router.get("/auth", auth ,UserController.check)

export default router;


