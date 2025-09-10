const User = require("../models/usersModel")


const getAll = async (req, res)=>{
    const users = await User.find({}).sort({createdAt: -1})
    res.status(200).json(users)
}


const createUser = async (req,res) =>{
    const user = await User.create({...req.body})
    res.status(201).json(user)
}


const getUserbyId = async (req, res)=>{
    const foundUser = await User.findById(req.params.userId)

    if(foundUser){
       res.status(200).json(foundUser)
    }else{
        res.status(404).json({message: "User not found"})
    }
}


const deletedUser = async (req,res)=>{
    const deletedUser = await User.deleteOne({_id: req.params.userId})
    if(deletedUser){
        res.status(200).json(deletedUser)
    }else{
        res.status(404).json({message: "Not deleted"})
    }
}


module.exports = {
    deletedUser,
    getUserbyId,
    createUser,
    getAll
}