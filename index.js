const server = require('./api/server')

const PORT = process.env.PORT || 4000

server.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' })
})

server.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({ message: 'Something has went terribly wrong' })
})

server.listen(PORT, () => {
  console.log(`\nServer listening on port: ${PORT}\n`)
})
