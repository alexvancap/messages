var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '',
    user     : '',
    password : '',
    database : ''
});

connection.connect()
if(!connection['_socket']['_hadError'])
    console.log('connected!')




connection.end();
console.log('disconnected')