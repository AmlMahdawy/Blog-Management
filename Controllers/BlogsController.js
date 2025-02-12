const blogsService = require('../services/blogs.service')

const getAllBlogs = async (req, res, next) => {
    const blogs = await blogsService.allBlogs(req, res, next)
    res.status(200).send(blogs)
}

const addBlog = async (req, res, next) => {

    const blog = await blogsService.createBLog(req, res, next)
    res.status(200).send(blog);
}
const deleteBlog = async (req, res, next) => {
    const blog = await blogsService.deleteBlog(req, res, next)
    res.status(200).send(blog);
}

const updateBlog = async (req, res, next) => {

    const updatedBlog = await blogsService.updateBlog(req, res, next)
    res.status(200).send(updatedBlog)
}

module.exports = {
    getAllBlogs,
    addBlog,
    deleteBlog,
    updateBlog
}