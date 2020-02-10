require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const slowDown = require('express-slow-down')

const corsObj = cors({
  origin: '*',
  methods: 'GET, PUT, POST, DELETE',
  preflightContinue: false
})

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 250,
  message: 'Too many requests, please try again later'
})

const slow = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 100,
  delayMs: 1000,
  maxDelayMs: 3000
})

module.exports = server => {
  server.use(helmet())
  server.use(morgan('short'))
  server.use(corsObj)
  server.use(express.json())
  if (process.env.NODE_ENV === 'production') {
    server.use(slow)
    server.use(limiter)
  }
}
