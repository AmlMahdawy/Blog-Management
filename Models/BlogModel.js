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



module.exports = mongoose.model("Blog", BlogsSchema)