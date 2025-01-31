import Users from "../models/User.js"

// Get all data users
export const getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['uuid', 'username', 'email', 'password']
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
            status: "Internal Server Error",
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
            attributes: ['uuid', 'username', 'email', 'password'],
            where: {
                uuid
            }
        })
        if (!user) {
            return res.status(200).json({
                message: "No user available"
            })
        }
        res.status(200).json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: "Internal Server Error",
            message: "Get detail data user has failed",
            error: error.message
        })
    }
}