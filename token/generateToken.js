require('dotenv').config()
const jwt = require('jsonwebtoken')

const generateToken = user => {
  const payload = {
    subject: user.id,
    username: user.username
  }

  const options = {
    expiresIn: '1d'
  }

  const secret = process.env.JWT_SECRET

  return jwt.sign(payload, secret, options)
}

module.exports = generateToken
