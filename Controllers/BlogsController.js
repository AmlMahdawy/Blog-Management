const blogsService = require('../services/blogs.service')
const { validateFilterParam } = require('../Validators/inputValidators')
const { validateBlog } = require('../Validators/modelsValidators')

const getAllBlogs = async (req, res, next) => {
    const { error } = validateFilterParam(req.params.filter)
    if (error) return res.send({ error: error.message });
    const blogs = await blogsService.allBlogs(req.params.filter)
    res.status(200).send({ blogs })
}

const addBlog = async (req, res, next) => {
    const blogData = { ...req.body }
    const { error } = validateBlog(...blogData);
    if (error) return res.status(400).send({ error: error.message })
    const blog = await blogsService.createBLog(blogData)
    res.status(200).send({ blog });
}
const deleteBlog = async (req, res, next) => {
    const blogId = req.params.id;
    const userId = req.body.userId;

    const blog = await blogsService.blogById(blogId);
    if (!blog) return res.status(404).send("Blog not found.");
    if (blog.userId !== userId) return res.status(403).send("Access Denied");

    const deletedBlog = await blogsService.deleteBlog(blogId);
    res.status(200).send({ deletedBlogd });
}

const updateBlog = async (req, res, next) => {
    const { title, content, category, userId } = req.body
    const blogId = req.params.id;

    const blog = await blogsService.blogById(blogId);
    if (!blog) return res.status(404).send("Blog not found.");
    if (!blog.userId === userId) return res.status(403).send("Access Denied");
    const updatedBlog = await blogsService.updateBlog(blogId, { title, content, category })
    res.status(200).send({ updatedBlog })
}



module.exports = {
    getAllBlogs,
    addBlog,
    deleteBlog,
    updateBlog
}