const mysql = require("mysql");
const { DBHost, DBUser, DBPass, DBName } = require("./config");


// Create a connection to the database
const connection = mysql.createConnection({
  host: DBHost,
  user: DBUser,
  password: DBPass,
  database: DBName
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});
console.log('not connected')

module.exports = connection;