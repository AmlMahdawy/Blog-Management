const winston = require('winston')
module.exports = function (err, req, res, next) {
    const status = err.status || 500
    winston.error(err.message, err);
    res.status(status).send(err.message);
}