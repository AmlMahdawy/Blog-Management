const { userModel } = require('../Models/UserModel');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const _ = require('lodash')
const { validateLoginData } = require('../Validators/inputValidators')
const { validateUser } = require('../Validators/modelsValidators')


const login = async (req, res, next) => {
    const { mail, password } = req.body
    const { error } = validateLoginData({ mail, password });
    if (error) return res.status(401).send({ message: error.message });

    const user = await userModel.findOne({ mail: mail });
    if (!user) return res.status(401).send({ message: "Invalid email or password." });
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) return res.status(401).send({ message: "Invalid email or password." });
    const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res.status(200).send({ "loggedIn": true, Bearer: token });

}


const signUp = async (req, res, next) => {

    const { error } = validateUser(req.body);
    if (error) return res.status(400).send({ message: error.message });
    let { name, password, mail } = req.body;

    //check if email is already registered 
    const mailExist = await userModel.findOne({ mail: mail });
    if (mailExist) return res.status(400).send({ message: "Email already registered." });

    //hash password
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const user = await userModel.create({ name, mail, password });



    //generate token 
    const token = await jwt.sign({ id: user?._id }, process.env.SECRET_KEY);

    res.status(200).send({ name: user?.name, mail: user?.mail, Bearer: token });
}

module.exports = {
    login,
    signUp,

}

