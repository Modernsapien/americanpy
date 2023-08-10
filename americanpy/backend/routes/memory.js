const { Router } = require('express')
const authenticator = require('../middleware/authenticator')
const memoryController = require('../controllers/memoryController')

const memoryRouter = Router()

memoryRouter.get("/", memoryController.getAllMemories)
memoryRouter.get("/:id", memoryController.getOneById)
memoryRouter.get("/:name", memoryController.getOneByMemoryName)
memoryRouter.post("/", memoryController.createMemory)
memoryRouter.delete("/:id", memoryController.deleteMemory)
memoryRouter.patch("/:id", memoryController.updateMemory)

module.exports = memoryRouter
