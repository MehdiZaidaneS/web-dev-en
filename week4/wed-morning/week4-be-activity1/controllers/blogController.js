const Blog = require("../models/blogModel")


const getAllBlogs = async (req, res) => {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.status(200).json(blogs);
};


const createBlog = async (req, res) => {
    const blog = await Blog.create({ ...req.body })

    if (blog) {
        res.status(201).json(blog)
    } else {
        res.status(500).json({ message: "Failed creating" })
    }
}


const getBlogById = async (req, res) => {
    const blog = await Blog.findById(req.params.blogId)
    if (blog) {
        res.status(200).json(blog)
    } else {
        res.status(404).json({ message: "COuldnt find the Blog" })
    }

}

const deleteBlog = async (req, res) => {
    const deleteBlog = await Blog.findOneAndDelete({ _id: req.params.blogId })
    if (deleteBlog) {
        res.status(200).json({ message: "Blog deleted successfully" });
    } else {
        res.status(404).json({ message: "Blog not found" });
    }
}

module.exports = {
    deleteBlog,
    getAllBlogs,
    getBlogById,
    createBlog
}


