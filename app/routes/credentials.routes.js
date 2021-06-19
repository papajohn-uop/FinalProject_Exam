module.exports = app => {
  const credentials = require("../controllers/credentials.controller.js");

// Endpoint to create credentials table
app.get("/credentials/createTable", credentials.createTable);

// Endpoint to populate credentials table
app.get("/credentials/populateTable", credentials.populateTable);

// Endpoint to retrieve all credentials
app.get("/credentials/getcredentials", credentials.findAll);


};

