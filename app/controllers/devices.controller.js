const Device = require("../models/devices.model.js");




// Create devices table in database
exports.createTable = (req, res) => {
Device.createTable((err, data) => {
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving users."
    });
  else res.send(data);
});
};



// Populate devices table in database
exports.populateTable = (req, res) => {
Device.populateTable((err, data) => {
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving users."
    });
  else res.send(data);
});
};


// Retrieve all devices from the database.
exports.findAll = (req, res) => {
Device.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};




// Retrieve all gNodeBs from the database.
exports.findgNodeBs = (req, res) => {
Device.getgNodeBs((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};


// Retrieve all cores from the database.
exports.findCores = (req, res) => {
Device.getCores((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};



// Retrieve all gNodeBs from the database for a specific user.
exports.findUsergNodeBs = (req, res) => {
  Device.getgNodeBsPerUser(req.params.userName, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.userName}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.userName
        });
      }
    } else res.send(data);
  });
};



// Retrieve all cores from the database for a specific user.
exports.findUserCores = (req, res) => {
  Device.getCoresPerUser(req.params.userName, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.userName}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.userName
        });
      }
    } else res.send(data);
  });
};
