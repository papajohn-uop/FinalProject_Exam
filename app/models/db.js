const mysql = require("mysql");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "mysql",
  user: "root",
  password: "root",
  database: "final_project_solution"
  //port:3306,
  //socketPath : '/var/run/mysqld/mysqld.sock'
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
