module.exports = (app, users, authenticate) => {
  //get all users
  app.get("/users", users.findAll);
  //find a specific user by id
  app.get("/users/:id", users.findOne)
  //
  app.get('/getUserInfo',authenticate, users.getByToken)
  //update a user
  app.put("/users/:id", users.update)
  //delete a user
  app.delete("/users/:id", users.delete)
  //delete all users
  app.delete("/users", users.deleteAll)

  //handles login submit
  app.post('/login', users.login)
  // //verify token
  // app.get("/login", authenticate, users.getUserByToken)
  //creates a user
  app.post('/register', users.create)
};