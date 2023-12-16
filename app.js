const express = require("express");
const app = express();
const port = 70;
const path = require("path");
const cors = require("cors");
// const axios = require("axios");
const { logger } = require("./logger");
const { sanitizeString } = require("./sanitizeString.js");
const { transport } = require("./email");

app.use(express.static("build"));
app.use(express.json());
app.use((req, res, next) => {
    logger.info(`Received a ${req.method} request for ${req.url}`);
    next();
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.post("/api/email", (req, res) => {
    let { name, email, phone, message } = req.body;
    name = sanitizeString(name);
    email = sanitizeString(email);
    phone = sanitizeString(phone);
    message = sanitizeString(message);

    transporter.sendMail(message);

});

app.listen(port, () => logger.info(`Listening to port ${port}`));
