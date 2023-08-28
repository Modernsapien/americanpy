const fs = require('fs');
require("dotenv").config();
const countryController = require('../controllers/countryController')

const db = require("./connect");

const sql = fs.readFileSync('./database/setup.sql').toString();

db.query(sql)
    .then(data => {
        countryController.setUpCountries()
        .then(data => {
            db.end();
            console.log("Set-up complete.");
        })
        
    })
    .catch(err => console.log(err))