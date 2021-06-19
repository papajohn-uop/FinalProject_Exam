const Location = require("../models/location.model.js");



// Create locations table in database
exports.createTable = (req, res) => {
  Location.createTable((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving locations."
      });
    else res.send(data);
  });
};



// Populate locations table in database
exports.populateTable = (req, res) => {
  Location.populateTable((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving locations."
      });
    else res.send(data);
  });
};


// Retrieve all locations from the database.
exports.findAll = (req, res) => {
  Location.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving locations."
        });
      else res.send(data);
    });
  };

