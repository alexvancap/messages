const express = require('express')
const app = express()
var http = require('http').createServer(app);  // build http server on top of the express one
var io = require('socket.io')(http);  // build a WS server on top of the http one.
var jwt = require('jsonwebtoken');


// this runs whenever a client establishes a WS connection with the server
console.log('lolol')
// Now make our new WS server listen to port 5000
io.listen(process.env.PORT || 4000, () => {  
    console.log('Listening ... 🚀 on port' + ' ' + (process.env.PORT || 4000))
})

// io.use(function(socket, next){
//     if (socket.handshake.query && socket.handshake.query.token){
//     jwt.verify(socket.handshake.query.token, 'SECRET_KEY', function(err, decoded) {
//         if(err) return next(new Error('Authentication error'));
//         socket.decoded = decoded;
//         next();
        
//     });
//     } else {
//         console.log('connected')
//         next(new Error('Authentication error'));
//     }    
// })
io.on('connection', function(socket) {
    require('./sockets')(socket, io)
});
