import express from "express"
import { register, login, refreshToken } from "../controllers/Auth.js"

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/token', refreshToken)

export default router