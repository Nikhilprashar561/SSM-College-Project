import { app } from "./app.js";
import { connectDB } from "./db/connect.js";
import dotenv from "dotenv"

dotenv.config({
    path : './.env'
})

const PORT = process.env.PORT || 3000

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started at : ${PORT}`)
    })
}).catch((err) => {
    console.log(`Server Crashed`, err)
})
