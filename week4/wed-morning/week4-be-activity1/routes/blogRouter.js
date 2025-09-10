const express = require("express")
const router = express.Router()

const { getAllBlogs, createBlog, getBlogById, deleteBlog } = require("../controllers/blogController")



router.get("/", getAllBlogs)

router.post("/", createBlog)

router.get("/:blogId", getBlogById)

router.delete("/:blogId", deleteBlog)





module.exports = router