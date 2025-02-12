const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {

    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("Missing Authentication Token");
    try {
        req.body.userId = jwt.verify(token, process.env.SECRET_KEY)?.id;
        next();
    }
    catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).send("Token Expired");
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).send("Invalid token");
        } else {
            console.error("JWT Verification Error:", err);
            return res.status(401).send("Authentication failed");
        }
    }




}
module.exports = authenticate;