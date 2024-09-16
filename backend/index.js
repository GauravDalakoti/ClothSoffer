import dotenv from "dotenv"

import app from "./src/app.js"
import connectDB from "./src/db/index.js"

dotenv.config({ path: "./.env" })

connectDB()
    .then(() => {

        app.on("error", (error) => {

            console.log("ERORR:", error)
            throw error
        });

        app.listen(process.env.PORT || 8000, () => {

            `Server is running at port http://localhost:${process.env.PORT}`
        })

    })
    .catch((error) => {

        console.log("MONGO DB connection failed !!! ", error)

    })