const jwt = require('jsonwebtoken')
exports.authenticate = (req, res, next) => {
    const token = req.header('Authorization')
    if(token) {
      console.log('token exists')
      token.replace('Bearer ', '')
      try{
        const payload = jwt.verify(token, process.env.JWT_SECRET) 
        console.log(payload._id)
        res.status(200).send({message: 'already logged in'})
    } catch(error) {
        console.error(error.message)
    }
  } else
    next()
}

exports.generate = (req, res, next) => {
  jwt.sign({ _id: 0, username: 'alex'}, process.env.JWT_SECRET, { expiresIn: '1 week' })
  next()
}