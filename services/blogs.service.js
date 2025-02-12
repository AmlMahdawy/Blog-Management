const BlogModel = require('../Models/BlogModel');

const createBLog = async (blogData) => {
    const blog = new BlogModel(blogData);
    await blog.save();
    return blog;
}
const updateBlog = async (blogId, blogData) => {
    return await BlogModel.findOneAndUpdate({ _id: blogId }, { ...blogData }, { new: true })
}
const deleteBlog = async (blogId) => {
    return await BlogModel.findByIdAndDelete(blogId);
}
const allBlogs = async () => {
    return await await BlogModel.find({});
}
const blogById = async (blogId) => {
    const blog = await BlogModel.findOne({ _id: blogId });
    return blog;

}
module.exports = {
    createBLog,
    updateBlog,
    deleteBlog,
    allBlogs,
    blogById
}