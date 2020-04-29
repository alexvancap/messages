const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const { port }  = require('./app/config/config')
const cors = require('cors')
const server = require('http').Server(express);
const io = require('socket.io')(server);

const app = express();
app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//imports the routes
require("./app/routes/index.js")(app);

// set port, listen for requests
server.listen(port, () => {
  console.log(port)
  console.log(`Server is running on port ${port}.`);
});

io.on('connection', (socket) => {
  console.log('connected')
});