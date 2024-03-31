import Router from "express"
import searchController from "../controllers/searchController.js";


const router = new Router()

router.get('/', searchController.searchItems);

export default router;