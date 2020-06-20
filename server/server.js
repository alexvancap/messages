const express = require('express') // imports express framework
const app = express() 
const http = require('http').createServer(app);  // build http server on top of the express one
const io = require('socket.io')(http);  // initialize a socket.io server by passing http
const usersController = require('./controllers/users.controller') //imports the users controller
const cors = require('cors') // allows us to set the cors origin
const bodyParser = require('body-parser') // accepts certain data types
const config = require('./config') // has all the constant variables
const socketioJwt = require('socketio-jwt') // imports the authorization m
const connectedUser = require('./controllers/connectedUser.controller') // controller that handles user connections

//accepts acces control from all origins (untill deployment)
app.use(cors())

//accept application/json data
app.use(bodyParser.json());

// verifies the jwt token
io.use(socketioJwt.authorize({
    secret: config.secret,
    handshake: true
}));

// route that runs once the login button is pressed (to bypass JWT authentication)
app.post('/login', usersController.login);
app.get('/authenticate-token', usersController.authenticateJWT);
app.post('/register', usersController.register);

//listen on the specified connection event for incomming sockets
http.listen(config.port || 4000, () => {  
    console.log('Listening ... 🚀 on port' + ' ' + (process.env.PORT || 4000))
})

// this runs whenever a client establishes a connection with the server
io.on('connection', (socket) =>{
    // puts the user connection in the database
    connectedUser.connect(socket)
    console.log('hi ' + socket.decoded_token.username)

    // imports all the sockets (routes)
    require('./sockets')(socket, io)

    socket.on('disconnect', () => {
        // deletes the user connection from the database
        connectedUser.disconnect(socket)
        console.log('bye ', socket.decoded_token.username)
    })
})