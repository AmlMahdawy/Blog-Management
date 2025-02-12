const mongoose = require("mongoose");
const BlogsSchema = mongoose.Schema({
    title: {
        type: String,
        // minlength: 5,
        // maxlength: 20,
        required: true,

    },
    category: {
        type: String,
        minlength: 5,
        // maxlength: 20,
        required: true,

    },
    content: {
        type: String,
        // minlength: 30,
        required: true,

    },
    userId: {
        type: String,
        required: true
    }
})

function validateBlog(blog) {
    const schema = joi.object({
        title: joi.string().min(3).max(25).required(),
        content: joi.string().required().min(50).max(255).email(),
        category: joi.string().min(8).max(30).required()
    })
    return schema.validate(user);
}
module.exports = mongoose.model("Blog", BlogsSchema)