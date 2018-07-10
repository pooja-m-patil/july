var cfenv = require("cfenv");
var request = require("request");
var devdisc;
temp:any={};


// load local VCAP configuration  and service credentials
var vcapLocal;
try {
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) { }

const appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {}

const appEnv = cfenv.getAppEnv(appEnvOpts);

if (appEnv.services['cloudantNoSQLDB'] || appEnv.getService(/cloudant/)) {
  // Load the Cloudant library.
  var Cloudant = require('cloudant');

  // Initialize database with credentials
  if (appEnv.services['cloudantNoSQLDB']) {
     // CF service named 'cloudantNoSQLDB'
     var cloudant = Cloudant(appEnv.services['cloudantNoSQLDB'][0].credentials);
  } else {
     // user-provided service with 'cloudant' in its name
     var cloudant = Cloudant(appEnv.getService(/cloudant/).credentials);
  }

  //database name
  var dbName = 'discoverdevices';

  // Create a new "mydb" database.
  cloudant.db.create(dbName, function(err, data) {
    if(!err) //err if database doesn't already exists
      console.log("Created database: " + dbName);
  });

  // Specify the database we are going to use (mydb)...
  devdisc = cloudant.db.use(dbName);
}


exports.deviceDisc=function(devId,name,callback)
{
  console.log("graph");
  devdisc.insert({'deviceId':devId},{'Description':name},function(err, data) {
    
    console.log(data);
    
});
}
// server.addDevice(devicename,devicetype,classname,subject,function(data){
//     console.log(data.authToken);
//     var deviceId=data.deviceId;
//     mydbiot.insert(data,deviceId, function(err) {
//       if (err) {
//         return console.log('[mydbiot.insert] ', err.message);
//       }
//     });
// response.send("Device Added successfully. Auth Token is : "+data.authToken);
// });