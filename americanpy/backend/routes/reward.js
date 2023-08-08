const { Router } = require('express')
const authenticator = require('../middleware/authenticator')
const rewardController = require('../controllers/rewardController')

const rewardRouter = Router()




module.exports = rewardRouter