const express = require('express') // imports express framework
const app = express() 
const http = require('http').createServer(app);  // build http server on top of the express one
const io = require('socket.io')(http);  // builds a WS server on top of the http one.
const jwt = require('jsonwebtoken');
const usersController = require('./controllers/users.controller') //imports the users controller
const cors = require('cors') // allows us to set the cors origin
const bodyParser = require('body-parser') // accepts certain data types
const config = require('./config') // has all the constant variables

//accepts acces control from all origins (untill deployment)
app.use(cors())

//accept application/json data
app.use(bodyParser.json());


console.log(process.env.PORT || 4000)

// this runs whenever a client establishes a WS connection with the server
io.on('connection', function(sockets) {
    // io.on('login', usersController.login)
    // sockets.on('login', (socket) => {
    //     usersController.login(socket, io)
    // });
    // require('./sockets')(sockets, io)
});

// route that runs once the login button is pressed (to bypass JWT authentication)
app.post('/login', usersController.login);

//starts the server on the specified port in the config or on 4000
http.listen(config.port || 4000, () => {  
    console.log('Listening ... 🚀 on port' + ' ' + (process.env.PORT || 4000))
})