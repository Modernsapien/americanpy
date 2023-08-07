const { Router } = require('express')
const authenticator = require('../middleware/authenticator')
const countryController = require('../controllers/countryController')

const countryRouter = Router()




module.exports = countryRouter