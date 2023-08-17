const { Router } = require('express')
const authenticator = require('../middleware/authenticator')
const countryController = require('../controllers/countryController')

const countryRouter = Router()


countryRouter.get('/', countryController.getAllCountry)
countryRouter.get('/:id', countryController.getCountryByID)
countryRouter.get('/country/:country', countryController.getCountryByCountry)
countryRouter.patch("/:id", countryController.updateCountry)
countryRouter.get('/country/:country', countryController.getCountryByCountry)
countryRouter.post("/", countryController.createCountry)
countryRouter.delete("/:id", countryController.deleteCountry)

module.exports = countryRouter
