const dotenv = require('dotenv')
dotenv.config()
module.exports = {
  DBHost: process.env.DBHOST,
  DBUser: process.env.DBUSERNAME,
  DBPass: process.env.DBPASSWORD,
  DBName: process.env.DATABASE,
  port: process.env.PORT,
  secret: process.env.JWTSECRET
};