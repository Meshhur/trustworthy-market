import express from "express"
import env from "dotenv"
import sequelize from "./db.js"
import cors from "cors"
import fileUpload from "express-fileupload"
import router from "./routes/index.js"
import errorHandler from "./middleware/ErrorHandler.js"

env.config()
const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.static("static"))
app.use(fileUpload({}))
app.use(express.json())
app.use("/api", router)


app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

start()