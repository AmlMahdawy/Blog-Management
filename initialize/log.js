const winston = require("winston");
require('express-async-errors');

const format = winston.format.combine(
    winston.format.json(),
    winston.format.simple())

module.exports = function () {
    //to handle uncaught exceptions
    winston.exceptions.handle(new winston.transports.Console({ format: format }),
        new winston.transports.File({ filename: 'rejections.log', format: format })
    );

    winston.add(new winston.transports.File({
        filename: "logs.log",
        format: format
    }));
    //to handle uncaught rejected promises
    winston.rejections.handle([new winston.transports.Console({ format: format }),
    new winston.transports.File({ filename: 'rejections.log', format: format })
    ]);

};

// require('express-async-errors'); // Keep this if you're using express-async-errors

// module.exports = function () {
//     const logger = winston.createLogger({
//         format: winston.format.simple()
//         ,
//         transports: [
//             new winston.transports.File({
//                 filename: "logs.log",
//                 handleExceptions: true,
//                 handleRejections: true,
//             }),
//             new winston.transports.Console({ // Configure console transport
//                 format: winston.format.combine( // Format for console
//                     winston.format.colorize({ all: true }), // Add color to the console output
//                     winston.format.simple()
//                 )
//             })
//         ],
//         exceptionHandlers: [
//             new winston.transports.File({ filename: 'exceptions.log' }),
//             new winston.transports.Console()
//         ],
//         rejectionHandlers: [
//             new winston.transports.File({ filename: 'rejections.log' }),
//             new winston.transports.Console()
//         ]
//     });

//     // Make the logger available to other modules
//     return logger;
// };