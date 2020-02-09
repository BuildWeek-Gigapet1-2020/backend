const express = require('express')
const middleware = require('../middleware')
const routes = require('../router/index.routes')

const server = express()

middleware(server)
routes(server)

server.use('/', (req, res, next) => {
  res.status(200).json({ message: 'Welcome to Gigapet!' })
})

module.exports = server
