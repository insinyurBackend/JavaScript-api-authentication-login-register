import express from "express"
import { getAllUsers } from "../controllers/User.js"

const router = express.Router()

router.get('/user', getAllUsers)

export default router