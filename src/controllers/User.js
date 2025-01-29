import Users from "../models/User.js"

// Get all data users
export const getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll()
        res.status(200).json(users)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: "Internal Server Error",
            message: "Get all data users has failed",
            error: error.message
        })
    }
}