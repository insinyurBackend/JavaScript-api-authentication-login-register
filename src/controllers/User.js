import Users from "../models/User.js"
import validator from "validator"
import bcrypt from "bcrypt"

// Get all data users
export const getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['uuid', 'username', 'email']
        })
        if (users.length === 0) {
            return res.status(200).json({
                message: "No users registered"
            })
        }
        res.status(200).json(users)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: "Error",
            message: "Get all data users has failed",
            error: error.message
        })
    }
}

// get detail data user
export const getDetailUser = async (req, res) => {
    const uuid = req.params.uuid
    try {
        const user = await Users.findOne({
            attributes: ['uuid', 'username', 'email'],
            where: {
                uuid
            }
        })
        if (!user) {
            return res.status(404).json({
                message: "No user available"
            })
        }
        res.status(200).json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: "Error",
            message: "Get detail data user has failed",
            error: error.message
        })
    }
}

// edit user
export const editUser = async (req, res) => {
    const uuid = req.params.uuid
    try {
        const user = await Users.findOne({
            where: {
                uuid: uuid
            }
        })
        if (!user) {
            return res.status(404).json({
                message: "No user available"
            })
        }
        const username = req.body.username.replace(/[^a-zA-Z0-9' ]/g, "")
        const email = req.body.email

        // check valid format email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid format email" })
        }

        // Cek duplikasi hanya jika username/email diubah
        if (username !== user.username) {
            const checkUsername = await Users.findOne({ where: { username } });
            if (checkUsername) {
                return res.status(409).json({ message: "Username already exists" })
            }
        }
        if (email !== user.email) {
            const checkEmail = await Users.findOne({ where: { email } });
            if (checkEmail) {
                return res.status(409).json({ message: "Email already exists" })
            }
        }
        // Validasi password hanya jika diubah
        let hashPassword = user.password;
        if (req.body.password && req.body.confPassword) {
            if (req.body.password !== req.body.confPassword) {
                return res.status(400).json({ message: "Password and Confirm Password not match" })
            }
            const salt = await bcrypt.genSalt(12);
            hashPassword = await bcrypt.hash(req.body.password, salt)
        }

        // Update user
        await user.update({
            username,
            email,
            password: hashPassword
        });

        res.status(200).json({
            status: "Success",
            message: "Edit user successfully",
            data: {
                uuid: user.uuid,
                username: user.username,
                email: user.email,
            }
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: "Error",
            message: "Edit data user has failed",
            error: error.message
        })
    }
}

// delete data user
export const deleteUser = async (req, res) => {
    const uuid = req.params.uuid
    try {
        const user = await Users.findOne({
            where: {
                uuid: uuid
            }
        })
        if (!user) {
            return res.status(404).json({
                message: "No user available"
            })
        }
        const username = user.username
        const email = user.email
        await user.destroy(req.body)
        res.status(200).json({
            status: "Success",
            message: "Data user deleted successfully",
            data: {
                uuid, username, email
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: "Error",
            message: "delete data user has failed",
            error: error.message
        })
    }
}