const jwt = require('jsonwebtoken');
const generateToken = require('./../services/generateToken')

let checkToken = (req, res, next) => {

  let token = req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.length > 1) {
    if (token.startsWith('Bearer '))
      token = token.slice(7, token.length);
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log(err)
          // return res.json({
          //   success: false,
          //   message: 'Token is not valid'
          // });
          return res.json({error: true, message: 'Token is invalid'})
        } else {
          req.decoded = decoded;
          req.token = generateToken(decoded)
          return next()
        }
      });
  } else {
      return next()
  }
};

module.exports = {
  checkToken: checkToken
}