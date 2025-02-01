import express from "express"
import { register, login, refreshToken, me, logout } from "../controllers/Auth.js"
import { verifyToken } from "../middleware/VerifyToken.js"

import swaggerUi from "swagger-ui-express"
import swaggerDocument from "../config/swagger/Swagger.json" assert { type: "json" }

const router = express.Router()

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.post('/register', register)
router.post('/login', login)
router.get('/token', refreshToken)
router.get('/me', verifyToken, me)
router.delete('/logout', logout)

export default router