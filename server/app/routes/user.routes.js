module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    // Create a new user
    app.post("/users", users.create);
    //get all users
    app.get("/users", users.findAll);
    //find a specific user by id
    app.get("/users/:id", users.findOne)
    //update a user
    app.put("/users/:id", users.update)
    //delete a user
    app.delete("/users/:id", users.delete)
  };