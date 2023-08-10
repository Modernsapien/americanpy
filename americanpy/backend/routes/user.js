const { Router } = require('express')
const authenticator = require('../middleware/authenticator')
const userController = require('../controllers/userController')

const userRouter = Router()

userRouter.get("/", userController.getUsers)
userRouter.post("/register", userController.register)
userRouter.post("/login", userController.login)
userRouter.delete("/logout", userController.logout)

userRouter.use(authenticator)

userRouter.get("/user/:id", userController.getUserById)
userRouter.patch('/picture/:id', userController.updateProfilePicture)

userRouter.get("/carbon/:id", userController.getCarbonPoints)
userRouter.patch("/carbon/add/:id", userController.addCarbonPoints)
userRouter.patch("/carbon/subtract/:id", userController.subtractCarbonPoints)

userRouter.get("/country/:id", userController.getUserCountries)
userRouter.patch("/country/:id", userController.addCountry)
userRouter.delete("/country/:id", userController.removeCountry)

userRouter.delete("/delete/:id", userController.deleteUser)


module.exports = userRouter