const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    MONGODB_URI: process.env.MONGODB_URI,
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV
};
