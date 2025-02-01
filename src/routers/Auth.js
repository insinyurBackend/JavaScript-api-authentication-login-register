import express from "express"
import { register, login, refreshToken, me, logout } from "../controllers/Auth.js"
import { verifyToken } from "../middleware/VerifyToken.js"

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/token', refreshToken)
router.get('/me', verifyToken, me)
router.delete('/logout', logout)

export default router