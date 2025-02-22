const validateUser = (user) => {
    const schema = joi.object({
        name: joi.string().min(3).max(20).required(),
        mail: joi.string().required().email(),
        password: joi.string().min(8).max(30).required()
    })
    return schema.validate(user);
}
function validateBlog(blog) {
    const schema = joi.object({
        title: joi.string().min(5).max(20).required(),
        content: joi.string().required().min(15).max(255).email(),
        category: joi.string().min(5).max(20).required()
    })
    return schema.validate(user);
}
module.exports = { validateBlog, validateUser }