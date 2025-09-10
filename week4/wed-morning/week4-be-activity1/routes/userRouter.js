const express = require("express")
const router = express.Router()


const { getAll, createUser, getUserbyId, deletedUser } = require("../controllers/userController")


router.get("/", getAll)
router.post("/", createUser)
router.get("/:userId", getUserbyId)
router.delete("/:userId", deletedUser)



module.exports = router
