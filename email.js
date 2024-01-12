const nodemailer = require("nodemailer");
const { logger } = require("./logger");

const transporter = nodemailer.createTransport({
   host: process.env.EMAIL_HOST,
   port: process.env.EMAIL_PORT,
   secure: false,
   auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
   },
   tls: {
    // rejectUnauthorized: false
   },
   logger: true,
   name: "kalaharibiocare.com"
//    requireTLS: true
});

transporter.verify(function(error, success) {
    if (error) {
        logger.error("Error connecting to mail server");
        logger.error(error);
    }
    else 
        logger.info("Connected to mail server");
});

exports.transporter = transporter;