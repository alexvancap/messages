const mysql = require("mysql");
const { DBHost, DBUser, DBPass, DBName } = require("./app/config/db.config.js");

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

module.exports = connection;