import jwt from "jsonwebtoken"
import "dotenv/config"

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.status(401).json({
            status: "Login Failed",
            message: "Token not found, login please"
        })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Access token has expired" })
        }
        req.email = decoded.email
        next()
    })
}