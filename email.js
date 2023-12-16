const nodemailer = require("nodemailer");
const { logger } = require("./logger");

const transporter = nodemailer.createTransport({
   host: process.env.EMAIL_HOST,
   port: 465,
   secure: true,
   auth: {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD
   } 
});

transporter.verify(function(error, success) {
    if (error)
        logger.error(error);
    else 
        logger.info("Connected to mail server");
});

exports.transporter = transporter;