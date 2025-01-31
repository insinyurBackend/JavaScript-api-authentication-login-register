import express from "express"
import { getAllUsers, getDetailUser } from "../controllers/User.js"
import { verifyToken } from "../middleware/VerifyToken.js"

const router = express.Router()

router.get('/user', verifyToken, getAllUsers)
router.get('/user/:uuid', verifyToken, getDetailUser)

export default router