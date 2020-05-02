const dotenv = require('dotenv') // saves 'secret' info so it won't get pushed to Github

dotenv.config() // defines the config file

// exports the .env variables as a config object
module.exports = {
  DBHost: process.env.DBHOST, // database hostname
  DBUser: process.env.DBUSERNAME, // database username
  DBPass: process.env.DBPASSWORD, // database password
  DBName: process.env.DATABASE, // database name
  port: process.env.PORT, // port to run the server on
  secret: process.env.JWTSECRET // secret string for JWT validation
};