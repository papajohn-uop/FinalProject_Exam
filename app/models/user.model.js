const sql = require("./db.js");

//Handle users table queries in database:
//Implemented so far:
//createTable,PopulateTable,getAll
//TODO:
//Insert entry
//Modify entry
//Delete Entry


// constructor
const User = function(user) {
  this.userID  = user.userID ;
  this.userName = user.userName;
  this.userDescription = user.userDescription;
};



//Create Table

User.createTable = result => {
  sql.query("CREATE TABLE locations (\
    userID int(11) NOT NULL AUTO_INCREMENT,\
    userName varchar(100) NOT NULL,\
    userDescription varchar(100) NOT NULL\
    PRIMARY KEY (locationID)\
  ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

//Populate Table (seeder)
/*
"INSERT INTO types(\
  typeName,\
  typeModel,\
  typeDetails,\
  typeParameters)\
  VALUES (\
     someTypeName,\
     someTypeModel,\
     someTypeDetails,\
     SomeTypeParameters,\
  )"
*/

User.populateTable = result => {
  sql.query("INSERT INTO users(\
    userName,\
    userDescription)\
    VALUES (\
       'ADMIE',\
       'IPTO Vertical (ADMIE) Using the facility'\
    ),\
    (\
      'TRAINOSE',\
      'RAILWAY Vertical (TRAINOSE) Using the facility'\
  )", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};






module.exports = User;
