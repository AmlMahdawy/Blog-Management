const blogsService = require('../services/blogs.service')

const getAllBlogs = async (req, res, next) => {
    const blogs = await blogsService.allBlogs()
    res.status(200).send(blogs)
}

const addBlog = async (req, res, next) => {
    const blogData = { ...req.body }
    const blog = await blogsService.createBLog(blogData)
    res.status(200).send(blog);
}
const deleteBlog = async (req, res, next) => {
    const blogId = req.params.id;
    const userId = req.body.userId;

    const blog = await blogsService.blogById(blogId);
    if (!blog) return res.status(404).send("Blog not found.");
    if (blog.userId !== userId) return res.status(403).send("Access Denied");

    const deletedBlog = await blogsService.deleteBlog(blogId);
    res.status(200).send(deletedBlog);
}

const updateBlog = async (req, res, next) => {
    const { title, content, category, userId } = req.body
    const blogId = req.params.id;

    const blog = await blogsService.blogById(blogId);
    if (!blog) return res.status(404).send("Blog not found.");
    if (!blog.userId === userId) return res.status(403).send("Access Denied");
    const updatedBlog = await blogsService.updateBlog(blogId, { title, content, category })
    res.status(200).send(updatedBlog)
}



module.exports = {
    getAllBlogs,
    addBlog,
    deleteBlog,
    updateBlog
}