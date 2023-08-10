const { Router } = require('express')
const authenticator = require('../middleware/authenticator')
const rewardController = require('../controllers/rewardController')

const rewardRouter = Router()

rewardRouter.get('/', rewardController.getAllRewards)
rewardRouter.get('/reward/:id', rewardController.getRewardByID)
rewardRouter.get("/points/:points_required",rewardController.getRewardsByPoints);
rewardRouter.post("/", rewardController.createReward)
rewardRouter.patch("/:id", rewardController.updatePointsRequired)
rewardRouter.delete("/:id", rewardController.deleteReward)


module.exports = rewardRouter