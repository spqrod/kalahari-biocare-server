const express = require("express");
const app = express();
const port = 20;
const cors = require("cors");
// const axios = require("axios");
const { logger } = require("./logger");



app.listen(port, () => logger.info(`Listening to port ${port}`));
