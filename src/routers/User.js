import express from "express"
import { register, getAllUsers, getDetailUser } from "../controllers/User.js"

const router = express.Router()

router.post('/register', register)
router.get('/user', getAllUsers)
router.get('/user/:uuid', getDetailUser)

export default router