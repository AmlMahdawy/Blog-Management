const BlogModel = require('../Models/BlogModel');

const createBLog = async (req, res, next) => {
    const blog = new BlogModel({ ...req.body });
    await blog.save();
    return blog;
}
const updateBlog = async (req, res, next) => {
    return await BlogModel.findOneAndUpdate({ userId: req.body.userId }, { ...req.body }, { new: true })
}
const deleteBlog = async (req, res, next) => {
    return await BlogModel.findByIdAndDelete(req.params.id);
}
const allBlogs = async (req, res, next) => {
    return await await BlogModel.find({});
}
module.exports = {
    createBLog,
    updateBlog,
    deleteBlog,
    allBlogs
}