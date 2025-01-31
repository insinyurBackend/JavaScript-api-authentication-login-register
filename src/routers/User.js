import express from "express"
import { getAllUsers, getDetailUser, editUser, deleteUser } from "../controllers/User.js"
import { verifyToken } from "../middleware/VerifyToken.js"

const router = express.Router()

router.get('/user', verifyToken, getAllUsers)
router.get('/user/:uuid', verifyToken, getDetailUser)
router.patch('/user/:uuid', verifyToken, editUser)
router.delete('/user/:uuid', verifyToken, deleteUser)

export default router