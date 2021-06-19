module.exports = app => {

const config = require("../controllers/config.controller.js");


//Config route has a simple endoint, allowing the configuration of a device depending on deviceID
app.get("/config/:dev_id", config.configDev);





};

