const mongoose = require("mongoose");
const BlogsSchema = mongoose.Schema({
    title: {
        type: String,
        minlength: 5,
        maxlength: 20,
        required: true,
        set: v => v.toLowerCase().trim(),
        get: v => v.toLowerCase().trim()

    },
    category: {
        type: String,
        minlength: 5,
        maxlength: 20,
        required: true,
        set: v => v.toLowerCase().trim(),
        get: v => v.toLowerCase().trim()

    },
    content: {
        type: String,
        minlength: 15,
        maxlength: 255,
        required: true,
        set: v => v.toLowerCase().trim(),
        get: v => v.toLowerCase().trim()

    },
    userId: {
        type: String,
        required: true
    }
})

function validateBlog(blog) {
    const schema = joi.object({
        title: joi.string().min(5).max(20).required(),
        content: joi.string().required().min(15).max(255).email(),
        category: joi.string().min(5).max(20).required()
    })
    return schema.validate(user);
}
module.exports = mongoose.model("Blog", BlogsSchema)