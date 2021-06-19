module.exports = app => {
  const locations = require("../controllers/locations.controller.js");



// Endpoint to createlocations table
app.get("/locations/createTable", locations.createTable);


// Endpoint to pPopulate locations table
app.get("/locations/populateTable", locations.populateTable);



// Endpoint to retrieve all locations
app.get("/locations/getLocations", locations.findAll);



};

