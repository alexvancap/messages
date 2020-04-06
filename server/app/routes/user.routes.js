module.exports = (app, users, handleToken) => {
  //get all users
  app.get("/users", users.findAll);
  //find a specific user by id
  app.get("/users/:id", users.findOne)
  //update a user
  app.put("/users/:id", users.update)
  //delete a user
  app.delete("/users/:id", users.delete)
  //delete all users
  app.delete("/users", users.deleteAll)

  //handles login submit
  app.post('/login', handleToken.authenticate, users.login)
  //creates a user
  app.post('/register', handleToken.generate, users.create)
};