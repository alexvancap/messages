const mysql = require("mysql"); // to make querries to the database
const { DBHost, DBUser, DBPass, DBName } = require("./config"); // imports login info from config.js

// Creates a connection to the mysql database
const connection = mysql.createConnection({
  host: DBHost, // database hostname
  user: DBUser, // database username
  password: DBPass, // database password
  database: DBName // database name
});

// opens the MySQL connection and displays errors if necesary
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

// exports the connection
module.exports = connection;