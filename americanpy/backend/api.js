const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger');


const api = express();

api.use(cors());
api.use(express.json());
api.use(logRoutes);

api.get('/', (req,res) => {
    res.status(200).send("Welcome to the PythonlyFans App")
})


module.exports = api;