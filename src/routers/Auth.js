import express from "express"
import { register, login, refreshToken, logout } from "../controllers/Auth.js"

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/token', refreshToken)
router.delete('/logout', logout)

export default router