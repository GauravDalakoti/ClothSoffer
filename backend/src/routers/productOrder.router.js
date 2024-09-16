import Router from "express"
import { orderProduct, cancelOrder, getAllOrders, orderConfirm, getCurrentUserOrders } from "../controllers/productOrder.controller.js"
import { verifyJWT, verifyAdminJWT } from "../middlewares/auth.middleware.js"

const router = Router()

// secured routes

router.route("/order-product").post(verifyJWT, orderProduct)
router.route("/cancel-order").post(verifyJWT, cancelOrder)
router.route("/get-all-orders").get(verifyAdminJWT, getAllOrders)
router.route("/order-confirm").post(verifyAdminJWT, orderConfirm)
router.route("/current-user-orders").get(verifyJWT, getCurrentUserOrders)

export default router