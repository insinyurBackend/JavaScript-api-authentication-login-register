import express from "express"
import fileUpload from "express-fileupload"
import "dotenv/config"
import cors from "cors"
import db from "./config/database/Connection.js"
import Users from "./routers/User.js"

// Set up Server
const app = express()
const port = process.env.APP_PORT

//Connection Database
const dbSync = async () => {
    try {
        await db.authenticate()
        console.log('Database connected successfully')
        await db.sync()
    } catch (error) {
        console.log('Database connection has filed', error)
    }
}
dbSync()

app.use(express.json())
app.use(fileUpload())
app.use(cors())

// routes
app.use(Users)

app.listen(port, () => {
    console.log(`Server up and running on port ${port}`)
})