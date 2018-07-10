var cfenv = require("cfenv");
var request = require("request");
var map;


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
  var dbName = 'map';

  // Create a new "mydb" database.
  cloudant.db.create(dbName, function(err, data) {
    if(!err) //err if database doesn't already exists
      console.log("Created database: " + dbName);
  });

  // Specify the database we are going to use (mydb)...
  map = cloudant.db.use(dbName);
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
    var request = require("request");

    var options = { method: 'POST',
      url: 'https://722fa7b8-0c41-4d59-ac8c-1c02d25eaef5-bluemix.cloudant.com/map/_find',
      headers: 
       { 'postman-token': '01a7b1b8-4ece-4aaf-b7f8-94dbd023450a',
         'cache-control': 'no-cache',
         authorization: 'Basic NzIyZmE3YjgtMGM0MS00ZDU5LWFjOGMtMWMwMmQyNWVhZWY1LWJsdWVtaXg6YjdkZGQyOGJmNzU1ODk1Nzg4NjA3NDU3YmRmMjgyZGJmNzJkY2EzMTg3YzA1ZDIwMTZjYjAzNGU5MDI1MDFhNw==',
         'content-type': 'application/json' },
      body: { selector: { _id: { '$gt': '0' } }, sort: [ { _id: 'asc' } ] },
      json: true };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
      callback(body);
    });
}