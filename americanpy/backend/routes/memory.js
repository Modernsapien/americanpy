const { Router } = require('express')
const authenticator = require('../middleware/authenticator')
const memoryController = require('../controllers/memoryController')

const memoryRouter = Router()

memoryRouter.get("/", memoryController.getAllMemories)
memoryRouter.get("/memory/:id", memoryController.getOneById)
memoryRouter.get("/name/:name", memoryController.getOneByMemoryName)
memoryRouter.post("/", memoryController.createMemory)
memoryRouter.delete("/:id", memoryController.deleteMemory)
memoryRouter.patch("/:id", memoryController.updateMemory)
memoryRouter.get("/user/:id", memoryController.getUserMemories)
module.exports = memoryRouter
