const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

const keys = require("./config/keys");

const userV1Routers = require("./routes/user/v1/api");

dotenv.config();

mongoose.connect(keys.MONGODB_URI).then(value => {
    console.log(`Connected to MongoDB on database ${value.connection.db.databaseName}`)
}).catch(error => {
    console.log(`MongoDB Error: ${error.message}`);
});

const app = express();

app.use(helmet({
    xssFilter: true
}));
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

app.use('/api/v1/user', userV1Routers);

module.exports = app;
