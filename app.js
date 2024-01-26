const express = require("express");
const app = express();
const port = 70;
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");
const { logger } = require("./logger");
const { sanitizeString } = require("./sanitizeString.js");
const { transporter } = require("./email");

app.use(express.static("build"));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    logger.info(`Received a ${req.method} request for ${req.url}`);
    next();
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.post("/api/email", async (req, res) => {

    const { captchaToken } = sanitizeString(req.body);
    const googleURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_CAPTCHA_SECRET_KEY}&response=${captchaToken}`;

    try {
        const response = await axios.post(googleURL);
        if (response.data.success) {
            logger.info(`Captcha in ${req.url} successful`);

            let { name, email, phone, formMessage } = req.body;
            name = sanitizeString(name);
            email = sanitizeString(email);
            phone = sanitizeString(phone);
            formMessage = sanitizeString(formMessage);

            const emailBody = `<h2>New Message From The Website!</h2>
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
            <p>Message: ${formMessage}</p>`;

            const message = {
                from: process.env.EMAIL_FROM,
                to: process.env.EMAIL_TO,
                subject: "New Message From Website",
                html: emailBody
            };

            transporter.sendMail(message)
                .then(() => res.json({success: true}))
                .catch(() => res.json({success: false}));

        } else {
            logger.info("CAPTCHA failed");
            res.json({res: "reCAPTCHA failed"});
        }
    } catch (error) {
        logger.info("CAPTCHA error");
        logger.info(error);
        res.status(500).json({res: "Error verifying reCAPTCHA"});
    }
});

app.listen(port, () => logger.info(`Listening to port ${port}`));
