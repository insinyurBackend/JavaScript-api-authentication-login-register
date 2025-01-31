import Users from "../models/User.js"
import validator from "validator"
import bcrypt from "bcrypt"

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
        const password = req.body.password.replace(/[^a-zA-Z0-9]/g, "")
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
                password: regist.password
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}