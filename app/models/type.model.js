const sql = require("./db.js");

//Handle types table queries in database:
//Implemented so far:
//createTable,PopulateTable,getAll
//TODO:
//Insert entry
//Modify entry
//Delete Entry

// constructor
const Type = function(type) {
  this.typeID  = type.userID ;
  this.typeName = type.typeName;
  this.typeModel = type.typeModel;
  this.typeDetails = type.typeDetails;
  this.typeParameters = type.typeParameters;
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
Type.createTable = result => {
  sql.query("CREATE TABLE types (\
    typeID int(11) NOT NULL AUTO_INCREMENT,\
    type varchar(100) NOT NULL,\
    typeModel varchar(100) NOT NULL,\
    typeDetails varchar(200) NOT NULL,\
    typeParameters varchar(300) NOT NULL,\
    PRIMARY KEY (typeID)\
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

Type.populateTable = result => {
  sql.query("INSERT INTO types(\
    type,\
    typeModel,\
    typeDetails,\
    typeParameters)\
    VALUES (\
       'gNodeB',\
       'AMARISOFT CLASSIC',\
       'PHYSICAL',\
       'EMBB 5G'\
    ),\
    (\
      'gNodeB',\
      'LIMENET MINI',\
      'VIRTUAL',\
      '5G/NB-IoT'\
    ),\
    (\
      'gNodeB',\
      'ETTUS SDR -SRS',\
      'VIRTUAL',\
      'GENERIC 5G'\
    ),\
    (\
      'core',\
      'AMARISOFT',\
      'PHYSICAL',\
      'GENERIC 5G'\
    ),\
    (\
      'core',\
      'OPEN5GS',\
      'PHYSICAL',\
      'GENERIC 5G'\
    ),\
    (\
      'core',\
      'OPEN5GS',\
      'VIRTUAL',\
      'GENERIC 5G'\
    )\
    ", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};







Type.getAll = result => {
  sql.query("SELECT * FROM types", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};


module.exports = Type;
