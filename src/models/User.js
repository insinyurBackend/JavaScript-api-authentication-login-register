import { Sequelize } from "sequelize"
import db from "../config/database/Connection.js"

const { DataTypes } = Sequelize

const Users = db.define('users', {
    uuid: {
        type: DataTypes.STRING,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    refresh_token: {
        type: DataTypes.STRING,
    }
}, {
    freezeTableName: true
}
)
export default Users