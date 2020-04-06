const express = require('express');
const { port } = require('./app/config/config')


const app = express();

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route


//imports the routes
require("./app/routes/index.js")(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log(`Server is running on port ${port}.`);
});