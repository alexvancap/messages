module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const handleToken = require('../middleware/handleJWTTokens')

    app.get("/", (req, res) => {
        res.json({ message: "Welcome to the backend of messages" });
    });
    
    require("./user.routes.js")(app, users, handleToken);
}