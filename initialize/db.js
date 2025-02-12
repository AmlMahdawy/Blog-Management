const mongoose = require('mongoose');
const winston = require('winston')
module.exports = function () {

    mongoose.connect(process.env.DATABASE_URL)
        .then(() => {
            winston.info(`db connected ... , date ${new Date}`)
        })

}