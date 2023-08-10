const fs = require('fs');
require("dotenv").config();

const db = require("../../database/connect");

const sql = fs.readFileSync('/Users/Guy 1/Desktop/liskov/lap4/project4/americanpy/americanpy/backend/tests/mockDatabase/setupMock.sql').toString();

db.query(sql)
    .then(data => {
        db.end();
        console.log("Set-up complete.");
    })
    .catch(err => console.log(err))