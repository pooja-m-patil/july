var cfenv = require("cfenv");
var request = require("request");
var citylist;


// load local VCAP configuration  and service credentials
var vcapLocal;
try {
  vcapLocal = require('../vcap-local.json');
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
  var dbName = 'cities';

  // Create a new "mydb" database.
  cloudant.db.create(dbName, function(err, data) {
    if(!err) //err if database doesn't already exists
      console.log("Created database: " + dbName);
  });

  // Specify the database we are going to use (mydb)...
  citylist = cloudant.db.use(dbName);
}




// exports.getLoginInfo=function(callback)
// {
//   console.log("data");
//   var deviceId='asdcv';
//   var name='a';
//   login.insert({'deviceId':deviceId,'name':name},function(data) {
//     //console.log('Error:', err);
//     console.log(data);
//     callback(data);
// });
// }

exports.getData=function(callback)
{
    console.log("hh");
    citylist.list({include_docs:true},function(err, data) {
    console.log('Error:', err);
    console.log(data);
    callback(data);
});
}