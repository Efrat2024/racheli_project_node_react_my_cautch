
const User = require("../models/user");

const getAllUsers = async (req, res) => {
    const users = await User.find().lean()
    res.json(users)
}
const updateUser = async (req, res) => {
    const { _id, fullname, password, email, phone, street, zipCode } = req.body
    const user = await User.findById(_id).exec()
    if (!user) {
        return res.status(400).json({ message: 'user not found' })
    }
    user.fullname
    user.password
    user.email
    user.phone
    user.street
    user.zipCode
    const updatedUser = await user.save()
    res.json(`'${updatedUser.fullname}' updated`)
}
const deleteUser = async (req, res) => {
    const { id } = req.body
    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({ message: 'user not found' })
    }
    const result = await user.deleteOne()
    const reply = `User ${result._id} deleted`
    res.json(reply)
}
const getUserById = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id).lean()
    if (!user) {
        return res.status(400).json({ message: 'No user found' })
    }
    res.json(user)
}
module.exports = {
    getAllUsers, getUserById, deleteUser, updateUser
}