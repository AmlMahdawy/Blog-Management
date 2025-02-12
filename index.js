const express = require("express");
const app = express();
const PORT = process.env.PORT || 2025;
const winston = require("winston");

require('dotenv').config();
require('./initialize/log')();
require('./initialize/routes')(app, express);
require('./initialize/db')();

app.listen(PORT, () => { winston.info(`Server connected on port ${process.env.PORT}`) })