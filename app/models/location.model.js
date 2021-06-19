const sql = require("./db.js");
//Handle location table queries in database:
//Implemented so far:
//createTable,PopulateTable,getAll
//TODO:
//Insert entry
//Modify entry
//Delete Entry


// constructor
const Location = function(location) {
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
Location.createTable = result => {
  sql.query("CREATE TABLE locations (\
    locationID int(11) NOT NULL AUTO_INCREMENT,\
    locationCountry varchar(100) NOT NULL,\
    locationCity varchar(100) NOT NULL,\
    locationAddress varchar(200) NOT NULL,\
    locationDescription varchar(300) NOT NULL,\
    locationLong int(11), \
    locationLat int(11), \
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

Location.populateTable = result => {
  sql.query("INSERT INTO locations(\
    locationCountry,\
    locationCity,\
    locationAddress,\
    locationDescription,\
    locationLong,\
    locationLat)\
    VALUES (\
       'Greece',\
       'Patras',\
       'ECE department, University of Patras',\
       'NAM LAB',\
       11,\
       12\
    ),\
    (\
      'Greece',\
      'Patras',\
      'ECE department, University of Patras',\
      'OTHER  LAB ',\
      13,\
      14\
    ),\
    (\
      'Greece',\
      'Patras',\
      'ECE department, University of Patras',\
      'ECE PARKING',\
      15,\
      16\
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







Location.getAll = result => {
  sql.query("SELECT * FROM locations", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};


module.exports = Location;
