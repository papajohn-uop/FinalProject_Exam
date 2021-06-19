const Credential = require("../models/credential.model.js");


// Create credentials table in database
exports.createTable = (req, res) => {
Credential.createTable((err, data) => {
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving credentials."
    });
  else res.send(data);
});
};



// Populate credentials table in database
exports.populateTable = (req, res) => {
Credential.populateTable((err, data) => {
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving credentials."
    });
  else res.send(data);
});
};


// Retrieve all credentials from the database.
exports.findAll = (req, res) => {
console.log("Ddd")
Credential.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving credentials."
      });
    else res.send(data);
  });
};

