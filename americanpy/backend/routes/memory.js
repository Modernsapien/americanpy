const { Router } = require('express')
const authenticator = require('../middleware/authenticator')
const memoryController = require('../controllers/memoryController')

const memoryRouter = Router()




module.exports = memoryRouter