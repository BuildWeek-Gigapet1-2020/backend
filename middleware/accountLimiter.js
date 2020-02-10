const rateLimit = require('express-rate-limit')

const accountLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: 'Too many attempts, please try again later'
})

const resetLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 3,
  message: 'You may only reset your password 3 times a day'
})

module.exports = { accountLimiter, resetLimiter }
