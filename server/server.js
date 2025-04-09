const express = require("express")
const session = require("express-session")
const path = require("path")
const server = express()

const config = require("./config/config")
const authController = require('../controllers/authController.js')
const memberController = require('../controllers/memberController')
const adminController = require('../controllers/adminController')
const movieController = require('../controllers/movieController');

const util = require('../models/util.js')

server.use(express.static(config.ROOT))

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use(session({
    secret: 'ThisIsASecretKey',
    resave: false,
    saveUninitialized: false
}))
server.use('/', movieController);
server.use('/', authController)
server.use(memberController)
server.use(adminController)



server.get('/', (req, res) => {
    res.sendFile('index.html', { root: config.ROOT })
})

server.use((req, res, next) => {
    util.logRequest(req, res)
    next()
})

server.use((req, res, next) => {
    res.status(404).sendFile('404.html', { root: config.ROOT })
})

server.listen(config.PORT, "localhost", () => {
    console.log(`Server listening on ${config.PORT}`)
})
