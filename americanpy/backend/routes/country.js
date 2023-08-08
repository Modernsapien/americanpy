const { Router } = require('express')
const authenticator = require('../middleware/authenticator')
const countryController = require('../controllers/countryController')

const countryRouter = Router()


countryRouter.get('/', countryController.getAllCountry)
countryRouter.get('/:id', countryController.getCountryByID)
countryRouter.patch("/:id", countryController.updateCountry)

module.exports = countryRouter
