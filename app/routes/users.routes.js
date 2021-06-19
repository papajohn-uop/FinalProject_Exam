module.exports = app => {
  const users = require("../controllers/user.controller.js");

//Endpoint to get all users from DB
app.get("/users/getUsers", users.findAll);

// Endpoint to create users table
app.get("/users/createTable", users.createTable);

// Endpoint to populate users table
app.get("/users/populateTable", users.populateTable);



};