const express = require('express')

const actionRouter = require('../data/helpers/Routers/actionRouter.js')
const projectRouter = require('../data/helpers/Routers/projectRouter.js')
const server = express()

server.use(express.json())
server.use(logger)
server.use('/api/actions', actionRouter)
server.use('/api/projects', projectRouter)

server.get('/', (req, res) => {
    res.send(`<h2> api documentation </h2>`)
})

// CUSTOMER LOGGER MIDDLEWARE //

function logger(req, res, next) {
    console.log(`a ${req.method} request was made to ${req.url} @ ${new Date()}`)
    next()
}

module.exports = server