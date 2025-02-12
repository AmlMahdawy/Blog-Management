const mongoose = require('mongoose');
const joi = require('joi')
const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,

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
function validateUser(user) {
    const schema = joi.object({
        name: joi.string().min(3).max(20).required(),
        mail: joi.string().required().email(),
        password: joi.string().min(8).max(30).required()
    })
    return schema.validate(user);
}
exports.userModel = mongoose.model("User", UsersSchema);
exports.validateUser = validateUser