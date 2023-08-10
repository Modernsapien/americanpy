const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger');
const userRouter = require('./routes/user')
const countryRouter = require('./routes/country')
const rewardRouter = require('./routes/reward')
const memoryRouter = require('./routes/memory')

const api = express();

api.use(cors());
api.use(express.json());
api.use(logRoutes);

api.get('/', (req,res) => {
    res.status(200).send("Welcome to the PythonlyFans App")
})

api.use('/users', userRouter)
api.use('/country', countryRouter)
api.use('/memory', memoryRouter)
api.use('/reward', rewardRouter)


module.exports = api;