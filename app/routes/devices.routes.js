module.exports = app => {
  const devices = require("../controllers/devices.controller.js");



// Endpoint to create devices table
app.get("/devices/createTable", devices.createTable);


//  Endpoint to populate devices table
app.get("/devices/populateTable", devices.populateTable);


// Endpoint to retrieve  all devices
app.get("/devices/getDevices", devices.findAll);

// Endpoint to retrieve all gNnodeBs
app.get("/devices/getgNodeBs", devices.findgNodeBs);

// Endpoint to retrieve all cores
app.get("/devices/getCores", devices.findCores);



// Endpoint to retrieve all gNnodeBs for user
app.get("/devices/getgNodeBs/:userName", devices.findUsergNodeBs);

// Endpoint to retrieve all cores for user
app.get("/devices/getCores/:userName", devices.findUserCores);


};

