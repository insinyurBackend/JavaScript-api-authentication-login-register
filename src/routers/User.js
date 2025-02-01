import express from "express"
import { getAllUsers, getDetailUser, editUser, deleteUser } from "../controllers/User.js"
import { verifyToken } from "../middleware/VerifyToken.js"

import swaggerUi from "swagger-ui-express"
import swaggerDocument from "../config/swagger/Swagger.json" assert { type: "json" }

const router = express.Router()

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Auth
 *     description: User login
 *     responses:
 *       200:
 *         description: Successfully logged in
 */
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get('/user', verifyToken, getAllUsers)
router.get('/user/:uuid', verifyToken, getDetailUser)
router.patch('/user/:uuid', verifyToken, editUser)
router.delete('/user/:uuid', verifyToken, deleteUser)

export default router