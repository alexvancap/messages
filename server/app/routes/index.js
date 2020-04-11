module.exports = app => {
    const users = require("./../controllers/user.controller.js");
    const friendships = require("./../controllers/friendships.controller.js")
    const { checkToken } = require('./../middleware/authenticateJWTToken')

    app.get("/", (req, res) => {
        res.json({ message: "Welcome to the backend of messages" });
    });
    
    require("./user.routes.js")(app, users, checkToken);
    require("./friendship.routes.js")(app, friendships, checkToken);
}