import express from "express"
import { getAllUsers, getDetailUser } from "../controllers/User.js"

const router = express.Router()

router.get('/user', getAllUsers)
router.get('/user/:uuid', getDetailUser)

export default router