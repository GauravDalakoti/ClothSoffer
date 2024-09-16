import Roter from "express"
import { adminLogin, adminLogout } from "../controllers/admin.controller.js"
import { verifyAdminJWT } from "../middlewares/auth.middleware.js"

const router = Roter()

router.route("/admin-login").post(adminLogin)
router.route("/admin-logout").get(verifyAdminJWT, adminLogout)

export default router