const User = require("../models/usersModel")
const mongoose = require("mongoose")


const getAll = async (req, res) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 })
        res.status(200).json(users)

    } catch (error) {
        res.status(500).json({ message: "Failed get all users" })
    }

}


const createUser = async (req, res) => {
    try {
        const user = await User.create({ ...req.body })
        res.status(201).json(user)

    } catch (error) {
        res.status(400).json({ message: "Fail creating user", error: error.message })
    }

}


const getUserbyId = async (req, res) => {

    const { userId } = req.params

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Ivalid id" })
    }

    try {
        const foundUser = await User.findById(userId)

        if (foundUser) {
            res.status(200).json(foundUser)
        } else {
            res.status(404).json({ message: "User not found" })
        }

    } catch (error) {
        res.status(500).json({ message: "Error finding user" })
    }


}


const deletedUser = async (req, res) => {

    const { userId } = req.params

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Ivalid id" })
    }

    try {
        const deletedUser = await User.deleteOne({ _id: userId })
        if (deletedUser) {
            res.status(200).json(deletedUser)
        } else {
            res.status(404).json({ message: "User not found " })
        }

    } catch (error) {
        res.status(500).json({ message: "Error deleting user" })
    }
}


module.exports = {
    deletedUser,
    getUserbyId,
    createUser,
    getAll
}