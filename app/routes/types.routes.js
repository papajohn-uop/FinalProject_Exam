module.exports = app => {
const types = require("../controllers/types.controller.js");



// Endpoint to create types table
app.get("/types/createTable", types.createTable);


// Endpoint to populate  types table
app.get("/types/populateTable", types.populateTable);


// Endpoint to get all devices types from DB
app.get("/types/getTypes", types.findAll);



};

