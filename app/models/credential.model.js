const sql = require("./db.js");

//Handle credentials table queries in database:
//Implemented so far:
//createTable,PopulateTable,getAll
//TODO:
//Insert entry
//Modify entry
//Delete Entry

// constructor
const Credential = function(credential) {
  this.locationID  = location.userID ;
  this.locationDescription = location.locationDescription;
  this.locationAddress = location.locationAddress;
  this.locationCity = location.locationCity;
  this.locationCountry = location.locationCountry;
  this.locationLong = location.locationLong;
  this.locationLat = location.locationLat;
};


//Create Table
/*
"CREATE TABLE types (\
  typeID int(11) NOT NULL AUTO_INCREMENT,\
  typeName varchar(100) NOT NULL,\
  typeModel varchar(100) NOT NULL,\
  typeDetails varchar(200) NOT NULL,\
  typeParameters varchar(300) NOT NULL,\
  PRIMARY KEY (typeID)\
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1"
*/
Credential.createTable = result => {
  sql.query("CREATE TABLE credentials (\
    credentialsID int(11) NOT NULL AUTO_INCREMENT,\
    ipAddr varchar(15) NOT NULL,\
    loginName varchar(100) NOT NULL,\
    password varchar(200) NOT NULL,\
    restAPIURL varchar(300) ,\
    PRIMARY KEY (credentialsID)\
  ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("credentials: ", res);
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

Credential.populateTable = result => {
  sql.query("INSERT INTO credentials(\
    ipAddr,\
    loginName,\
    password,\
    restAPIURL)\
    VALUES (\
       '192.10.10.4',\
       'ubuntu',\
       'pass1234',\
       ''\
    ),\
    (\
      '192.100.10.34',\
      'ubuntu',\
      'pass5678',\
      ''\
)\
    ", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("credentials: ", res);
    result(null, res);
  });
};







Credential.getAll = result => {
  sql.query("SELECT * FROM credentials", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("credentials: ", res);
    result(null, res);
  });
};


module.exports = Credential;
