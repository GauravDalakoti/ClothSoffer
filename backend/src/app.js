import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userrouter from "./routers/user.router.js"
import productrouter from "./routers/productOrder.router.js"
import itemrouter from "./routers/item.router.js"
import cartrouter from "./routers/cart.router.js"
import adminrouter from "./routers/admin.router.js"

const app = express()

app.set('trust proxy', 1);

app.use(cors({ credentials: true, methods: ["POST", "GET", "PATCH", "DELETE"], origin: process.env.CORS_ORIGIN }))
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))

app.use(cookieParser())

// user routers
app.use("/api/v1/users", userrouter)

// order routers
app.use("/api/v1/orders", productrouter)

// item routers
app.use("/api/v1/items", itemrouter)

// cart routers
app.use("/api/v1/carts", cartrouter)

// admin routers
app.use("/api/v1/admin", adminrouter)

export { app }

