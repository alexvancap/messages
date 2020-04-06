module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const auth = require('./../controllers/auth.controller')
    const handleToken = require('../middleware/handleJWTTokens')

    app.get("/", (req, res) => {
        res.json({ message: "Welcome to the backend of messages" });
    });
    
    require("./user.routes.js")(app, users, handleToken);
    require("./auth.routes.js")(app, auth, handleToken);
}