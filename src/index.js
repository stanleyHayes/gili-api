const app = require("./app");
const keys = require("./config/keys");

const PORT = keys.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Connected to server in ${keys.NODE_ENV} mode on port ${PORT}`)
})
