import Users from "../models/User.js"
import validator from "validator"
import bcrypt from "bcrypt"
import "dotenv/config"
import jwt from "jsonwebtoken"

// Register
export const register = async (req, res) => {
    try {
        const username = req.body.username.replace(/[^a-zA-Z0-9' ]/g, "")

        const email = req.body.email
        // check valid format email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid format email" })
        }

        // check duplicate username and email
        const [checkUsername, checkEmail] = await Promise.all([
            Users.findOne({ where: { username } }),
            Users.findOne({ where: { email } }),
        ]);
        if (checkUsername) {
            return res.status(400).json({ message: "Username already exists" })
        }
        if (checkEmail) {
            return res.status(400).json({ message: "Email already exists" })
        }

        // check password and confirm password
        const password = req.body.password
        const confPassword = req.body.confPassword

        if (password !== confPassword) {
            return res.status(400).json({ message: "Password and Confirm Password not match" })
        }

        // Hash password
        const salt = await bcrypt.genSalt(12)
        const hashPassword = await bcrypt.hash(password, salt)

        const regist = await Users.create({
            username,
            email,
            password: hashPassword
        })
        res.status(201).json({
            status: "Success",
            message: "Register user successfully",
            data: {
                uuid: regist.uuid,
                username: regist.username,
                email: regist.email,
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Internal server error",
            message: "Registration failed"
        });
    }
}

// Login
export const login = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                email: req.body.email
            }
        })
        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) {
            return res.status(400).json({ message: "Wrong Password" })
        }

        const userId = user.uuid
        const username = user.username
        const email = user.email

        const accessToken = jwt.sign({ userId, username, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
        const refreshToken = jwt.sign({ userId, username, email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })

        await Users.update({ refresh_token: refreshToken }, {
            where: {
                uuid: userId
            }
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        })

        res.status(200).json({
            status: "success",
            message: `${username} login successfully`,
            accessToken
        })

    } catch (error) {
        res.status(404).json({
            status: "Failed",
            message: "User not Found"
        })
    }
}

// Refresh Token
export const refreshToken = async (req, res) => {
    try {
        const refresh = req.cookies.refreshToken
        if (!refresh) {
            return res.status(401).json({ message: "No user login. login please" })
        }
        const user = await Users.findOne({
            where: {
                refresh_token: refresh
            }
        })
        if (!user) {
            return res.status(403).json({ message: "Refresh token not match" })
        }
        jwt.verify(refresh, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Refresh token error" })
            }
            const userId = user.uuid
            const username = user.username
            const email = user.email
            const accessToken = jwt.sign({ userId, username, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
            res.status(201).json({
                status: "Success",
                message: "Generate new access token",
                accessToken
            })
        })
    } catch (error) {
        console.log(error)
    }
}

// User profile login
export const me = async (req, res) => {
    try {
        const token = req.cookies.refreshToken
        if (!token) {
            return res.status(404).json({ message: "User not login, login please" })
        }
        const user = await Users.findOne({
            where: {
                refresh_token: token
            }
        })
        if (!user) {
            return res.status(403).json({ message: "Refresh token not found, login please" })
        }
        const uuid = user.uuid
        const username = user.username
        const email = user.email
        return res.status(200).json({
            uuid, username, email
        })
    } catch (error) {
        console.log(error)
    }

}
// Logout
export const logout = async (req, res) => {
    try {
        const token = req.cookies.refreshToken
        if (!token) {
            return res.status(404).json({ message: "User not found, login please" })
        }
        const user = await Users.findOne({
            where: {
                refresh_token: token
            }
        })
        if (!user) {
            return res.status(403).json({ message: "Refresh token not found, login please" })
        }
        const email = user.email
        const username = user.username

        await user.update({ refresh_token: null }, {
            where: {
                email: email
            }
        })
        res.clearCookie('refreshToken')
        return res.status(200).json({
            status: "Success",
            message: `${username} logged out successfully`
        })
    } catch (error) {
        console.log(error)
    }
}