import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { addToCart, getCartProducts, removeToCart } from "../controllers/cart.controller.js";

const router = Router()

router.route("/add-to-cart").post(verifyJWT, addToCart)
router.route("/remove-to-cart").post(verifyJWT, removeToCart)
router.route("/get-cart-products").get(verifyJWT, getCartProducts)

export default router