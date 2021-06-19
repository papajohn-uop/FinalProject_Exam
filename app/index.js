const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//Allow access form other servers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


//A basic response on /root endpoint that shows the available endpoints
  var routes_help = {
    active_APIs:{
    config: {"/config/:dev_id":"Configure a device"},
    credentials: {"/credentials/createTable":"Create table for credentials","/credentials/populate":"Populate table for credentials"},
    locations: {"/locations/createTable":"Create table for locations","/locations/populate":"Populate table for locations"},
    types: {"/types/createTable":"Create table for types","/types/populate":"Populate table for types"},
    users: {"/users/createTable":"Create table for users","/users/populate":"Populate table for users"},
    devices: {"/devices/createTable":"Create table for devices","/devices/populate":"Populate table for devices",
              "/devices/getgNodeBs":"Get all gNodeBs","/devices/getCores":"Get all cores",
              "/devices/getgNodeBs/:userName":"Get all gNodeBs for a specific user","/devices/getCores/:userName":"Get all cores for a specific user" },
    },
  };

// Root route
app.get("/", (req, res) => {
  res.send(routes_help );
});

//routes for handling users
require("./routes/users.routes.js")(app);

//routes for handling types
require("./routes/types.routes.js")(app);

//routes for handling location info
require("./routes/locations.routes.js")(app);

//routes for handling credential info
require("./routes/credentials.routes.js")(app);

//routes for handling devices info
require("./routes/devices.routes.js")(app);

//routes for configuring devices
require("./routes/config.routes.js")(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
