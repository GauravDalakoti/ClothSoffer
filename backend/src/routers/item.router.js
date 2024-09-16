import { Router } from "express";
import { addNewItem, getAllItems, getCurrentItem, getRelatedItems } from "../controllers/Item.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/add-new-item").post(upload.array('images'), addNewItem)
router.route("/get-all-items").get(getAllItems)
router.route("/get-current-item").post(getCurrentItem)
router.route("/get-related-items").post(getRelatedItems)

export default router