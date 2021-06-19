const sql = require("./db.js");
//Handle credentials table queries in database:
//Implemented so far:
//createTable,PopulateTable,getAll
//getGnodeBs,getCores,getgNodeBsPerUser,getCoresPerUser
//TODO:
//Insert entry
//Modify entry
//Delete Entry

// constructor
const Device = function(device) {
  this.deviceID  = device.deviceID ;
  this.deviceName  = device.deviceName ;
  this.deviceLocationID  = device.deviceLocationID ;
  this.deviceCredentialsID  = device.deviceCredentialID ;
  this.deviceTypeID  = device.deviceTypeID ;
  this.deviceUserID  = device.deviceUserID ;
  this.deviceConfiguration  = device.deviceConfiguration ;
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
Device.createTable = result => {
  sql.query("CREATE TABLE `devices` (\
    `deviceID` int(11) NOT NULL AUTO_INCREMENT,\
    `deviceName` varchar(100) NOT NULL,\
    `userID` int(11) NOT NULL,\
    `typeID` int(11) NOT NULL,\
    `locationID` int(11) NOT NULL,\
    `credentialsID` int(11) NOT NULL,\
    `configuration` varchar(300) NOT NULL,\
    PRIMARY KEY (`deviceID`),\
    KEY `credentialsID` (`credentialsID`),\
    KEY `userID` (`userID`),\
    KEY `locationID` (`locationID`),\
    KEY `typeID` (`typeID`),\
    CONSTRAINT `devices_ibfk_cred` FOREIGN KEY (`credentialsID`) REFERENCES `credentials` (`credentialsID`),\
    CONSTRAINT `devices_ibfk_user` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),\
    CONSTRAINT `devices_ibfk_loca` FOREIGN KEY (`locationID`) REFERENCES `locations` (`locationID`),\
    CONSTRAINT `devices_ibfk_type` FOREIGN KEY (`typeID`) REFERENCES `types` (`typeID`)\
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("devices: ", res);
    result(null, res);
  });
};

//Populate Table (seeder)

Device.populateTable = result => {
  sql.query("INSERT INTO devices(\
    deviceName,\
    userID,\
    typeID,\
    locationID,\
    credentialsID,\
    configuration\
    )\
    VALUES (\
    'GNODEB FOR ADMIE',\
     1,\
     1,\
     1,\
     1,\
     'STANDARD CONF FILE'),\
     (\
      'GNODEB FOR ADMIE',\
       1,\
       1,\
       1,\
       1,\
       'STANDARD CONF FILE'),\
    (\
      'GNODEB FOR TRAINOSE',\
      1,\
      2,\
      1,\
      1,\
      'NBIOT STANDARD CONF FILE' ),\
      (\
        'MME FOR ADMIE',\
        1,\
        7,\
        1,\
        1,\
        'GENERIC 5G' ),\
        (\
          'MME FOR ADMIE',\
          1,\
          8,\
          1,\
          1,\
          'GENERIC 5G' ),\
          (\
            'MME FOR TRAINOSE',\
            2,\
            9,\
            4,\
            2,\
            'GENERIC 5G' )", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};







Device.getAll = result => {
  sql.query("SELECT * FROM devices", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("devices: ", res);
    result(null, res);
  });
};



Device.getgNodeBs = result => {
  //sql.query("select * from devices inner join types on devices.typeID=types.typeID where types.type='gNodeB'", (err, res) => {
    console.log("DDDDDDDD")
    sql.query("select u.userName,d.deviceName , d.deviceID  , t.typeDetails,t.typeParameters, t.typeModel, t.type,\
                      l.locationDescription, l.locationLong,l.locationLat, \
                      c.ipAddr,c.loginName, c.password\
                      from devices d \
                      inner join types t on d.typeID=t.typeID \
                      inner join locations l on d.locationID=l.locationID \
                      inner join users u  on d.userID=u.userID\
                      inner join credentials  c  on d.credentialsID=c.credentialsID\
                      where t.type='gNodeB' ", (err, res) => {
      if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("devices: ", res);
    result(null, res);
  });
};


Device.getCores = result => {
 // sql.query("select * from devices inner join types on devices.typeID=types.typeID where types.type='core'", (err, res) => {
    sql.query("select u.userName,d.deviceName , d.deviceID ,t.typeDetails,t.typeParameters, t.typeModel, t.type,\
    l.locationDescription, l.locationLong,l.locationLat, \
    c.ipAddr,c.loginName, c.password\
    from devices d \
    inner join types t on d.typeID=t.typeID \
    inner join locations l on d.locationID=l.locationID \
    inner join users u  on d.userID=u.userID\
    inner join credentials  c  on d.credentialsID=c.credentialsID\
    where t.type='core' ", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("devices: ", res);
    result(null, res);
  });
};



Device.getgNodeBsPerUser = (user, result) => {
  console.log(user)
  console.log(user)
  //sql.query("select * from devices inner join types on devices.typeID=types.typeID where types.type='gNodeB'", (err, res) => {
    sql.query(`select u.userName,d.deviceName , d.deviceID ,t.typeDetails,t.typeParameters,  t.type,\
                      l.locationDescription, l.locationLong,l.locationLat, \
                      c.ipAddr,c.loginName, c.password\
                      from devices d \
                      inner join types t on d.typeID=t.typeID \
                      inner join locations l on d.locationID=l.locationID \
                      inner join users u  on d.userID=u.userID\
                      inner join credentials  c  on d.credentialsID=c.credentialsID\
                      where t.type=\'gNodeB\' and u.userName = \'${user}\'`, (err, res) => {
      if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("devices: ", res);
    result(null, res);
  });
};



Device.getCoresPerUser  = (user, result) => {
  // sql.query("select * from devices inner join types on devices.typeID=types.typeID where types.type='core'", (err, res) => {
     sql.query("select u.userName,d.deviceName, d.deviceID ,t.typeDetails,t.typeParameters, t.typeModel, t.type,\
     l.locationDescription, l.locationLong,l.locationLat, \
     c.ipAddr,c.loginName, c.password\
     from devices d \
     inner join types t on d.typeID=t.typeID \
     inner join locations l on d.locationID=l.locationID \
     inner join users u  on d.userID=u.userID\
     inner join credentials  c  on d.credentialsID=c.credentialsID\
     where t.type='core' ", (err, res) => {
     if (err) {
       console.log("error: ", err);
       result(null, err);
       return;
     }
 
     console.log("devices: ", res);
     result(null, res);
   });
 };
 module.exports = Device;
