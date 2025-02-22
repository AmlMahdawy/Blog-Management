const joi = require('joi')

const validateLoginData = (data) => {
    const schema = joi.object({
        mail: joi.string().required().email(),
        password: joi.string().min(8).max(30).required()
    })
    return schema.validate(data);
}
const validateFilterParam = (filter) => {
    const schema = joi.string().min(5).max(20);
    return schema.validate(filter);
}
module.exports = { validateLoginData, validateFilterParam }