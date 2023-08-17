const { Router } = require('express')
const authenticator = require('../middleware/authenticator')
const countryController = require('../controllers/countryController')

const countryRouter = Router()


countryRouter.get('/', countryController.getAllCountry)
countryRouter.get('/country/:country', countryController.getCountryByCountry)
countryRouter.get('/:id', countryController.getCountryByID)
countryRouter.patch("/:id", countryController.updateCountry)
countryRouter.post("/", countryController.createCountry)
countryRouter.delete("/:id", countryController.deleteCountry)

module.exports = countryRouter
