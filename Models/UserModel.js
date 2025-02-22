const mongoose = require('mongoose');
const joi = require('joi')
const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        set: v => v.trim(),
        get: v => v.trim(),


    },
    mail: {
        type: String,
        required: true,
        set: v => v.toLowerCase().trim()

    },
    password: {
        type: String,
        minLength: 8
    }

})

exports.userModel = mongoose.model("User", UsersSchema);
