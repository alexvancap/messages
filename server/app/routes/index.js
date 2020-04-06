module.exports = app => {
    app.get("/", (req, res) => {
        res.json({ message: "Welcome to the backend of messages" });
    });
    require("./app/routes/user.routes.js")(app);
}