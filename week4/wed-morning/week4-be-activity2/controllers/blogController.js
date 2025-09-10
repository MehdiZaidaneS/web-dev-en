const Blog = require("../models/blogModel")
const mongoose = require("mongoose")


const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve blogs" });
    }
};


const createBlog = async (req, res) => {
    try {
        const blog = await Blog.create({ ...req.body })
        res.status(201).json(blog)
    } catch (error) {
        res.status(400).json({ message: "Failed to create blog", error: error.message });
    }
}


const getBlogById = async (req, res) => {
    const { blogId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
        return res.status(400).json({ message: "Invalid car ID" });
    }

    try {
        const car = await Blog.findById(carId);
        if (car) {
            res.status(200).json(car);
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve blog" });
    }
}



const deleteBlog = async (req, res) => {

    const { blogId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
        return res.status(400).json({ message: "Invalid car ID" });
    }

    try {
        const deleteBlog = await Blog.findOneAndDelete({ _id: blogId })
        if (deleteBlog) {
            res.status(200).json({ message: "Blog deleted successfully" });
        } else {
            res.status(404).json({ message: "Blog not found" });
        }

    } catch (error) {
        res.status(500).json({ message: "Failed to delete blog" });
    }


}

module.exports = {
    deleteBlog,
    getAllBlogs,
    getBlogById,
    createBlog
}


