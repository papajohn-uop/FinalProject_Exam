const Type = require("../models/type.model.js");




// Create types table in database
exports.createTable = (req, res) => {
  Type.createTable((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving types."
      });
    else res.send(data);
  });
};



// Populate types table in database
exports.populateTable = (req, res) => {
  Type.populateTable((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving types."
      });
    else res.send(data);
  });
};


// Retrieve all types from the database.
exports.findAll = (req, res) => {
    Type.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving types."
        });
      else res.send(data);
    });
  };

