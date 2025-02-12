const BlogModel = require('../Models/BlogModel');


const authorise = async (req, res, next) => {

    const blog = await BlogModel.findOne({ _id: req.params.id });
    if (!blog) return res.status(404).send("Blog not found.");
    if (!blog.userId === req.body.userId) return res.status(403).send("Access Denied");
    next();

}
module.exports = authorise;