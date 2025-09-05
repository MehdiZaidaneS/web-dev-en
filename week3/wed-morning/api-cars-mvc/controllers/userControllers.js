const User = require("../models/userModel");

// GET /users
const getAllUsers = (req, res) => {
  const users = User.getAll()
  res.json(users)
};

// POST /users
const createUser = (req, res) => {
   const user = User.addOne({...req.body})
   if(user){
    res.json(user)
   }else{
    res.status(500).json({message: "Error creating user"})
   }
};

// GET /users/:userId
const getUserById = (req, res) => {
  const id = req.params.userId
  
  const user = User.findById(id)

  if(user){
    res.json(user)
  }else{
    res.status(404).json({message: "User not found"})
  }

};

// PUT /users/:userId
const updateUser = (req, res) => {
  const id = req.params.userId
  const updatedUser = User.updateOneById(id, {...req.body})
  if(updatedUser){
    res.json(updatedUser)
  }else{
    res.status(404).json({message: "User not updated"})
  }
};

// DELETE /users/:userId
const deleteUser = (req, res) => {
  const id = req.params.userId

  const deletedUser = User.deleteOneById(id)

  if(deletedUser){
    res.json({message: "User was deleted"})
  }else{
    res.status(404).json({message: "User not deleted"})
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
