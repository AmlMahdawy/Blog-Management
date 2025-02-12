const { validateUser, userModel } = require('../Models/UserModel');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const _ = require('lodash')
const joi = require('joi')


const login = async (req, res, next) => {
    const { error } = validateLoginData(req.body);
    const user = await userModel.findOne({ mail: req.body.mail });
    if (error | !user) return res.status(401).send("Invalid email or password.");
    const passwordMatched = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatched) return res.status(401).send("Invalid email or password.");
    const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res.status(200).header({ "x-auth-token": token }).send({ "loggedIn": true });

}
function validateLoginData(data) {
    const schema = joi.object({
        mail: joi.string().required().email(),
        password: joi.string().min(8).max(30).required()
    })
    return schema.validate(data);
}


const signUp = async (req, res, next) => {

    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.message);

    let { name, password, mail } = req.body;

    //check if email is already registered 
    const mailExist = await userModel.findOne({ mail: mail });
    if (mailExist) return res.status(400).send("Email already registered.");

    //hash password
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const user = new userModel({ name, mail, password });
    const createdUser = await user.save();

    //generate token 
    const token = await jwt.sign({ id: createdUser._id }, process.env.SECRET_KEY);

    res.status(200).header({ "x-auth-token": token }).send(_.pick(user, ["name", "mail"]));
}

module.exports = {
    login,
    signUp
}