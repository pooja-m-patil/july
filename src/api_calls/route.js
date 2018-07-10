var express = require("express");
var app = express();
var cfenv = require("cfenv");
var request = require("request");
var express1 = require('express-validation');
var server = require('./functions.js');
var server2 = require('./login.js');
var multipart = require('connect-multiparty');
var bodyParser = require('body-parser');
var server1 = require('./graphfunction');
//var disc=require('./discovery.js');
var map = require('./map.js');
var city = require('../city.js');
var reg = require('./register.js');
var type = require('./devicetypes');


var vcapLocal;
try {
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) { }

const appEnvOpts = vcapLocal ? { vcap: vcapLocal } : {}

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
  var dbName = 'mydbiot';
  var dbName1 = 'login';

  // Create a new "mydb" database.
  cloudant.db.create(dbName, function (err, data) {
    if (!err) //err if database doesn't already exists
      console.log("Created database: " + dbName);
  });

  cloudant.db.create(dbName1, function (err, data) {
    if (!err) //err if database doesn't already exists
      console.log("Created database: " + dbName1);
  });

  // Specify the database we are going to use (mydb)...
  mydbiot = cloudant.db.use(dbName);
  login = cloudant.db.use(dbName);
}



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.bodyParser());


// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

app.post("/login", function (request, response) {
  //console.log(request.body.username);
  var uname = request.body.username;
  var pass = request.body.password;
  server2.getLoginInfo(uname, pass, function (data) {
    console.log(data);
    response.send(data);
  });
});

app.post("/register", function (request, response) {
  //console.log(request.body.username);
  var uname = request.body.email;
  var pass1 = request.body.pass1;
  console.log(uname + " " + " " + pass1);
  reg.registerUser(uname, pass1, function (data) {
    console.log(data);
    response.send(data);
  });
});

app.post("/datafetch", function (request, response) {
  console.log(request.body.name);
  var name = request.body.name;
  console.log(name);
  server.getDevicesInfo(name, function (data) {
    console.log(data);
    response.send(data);
  });
});

app.post("/add", function (request, response) {

  var devicename = request.body.devicename;

  server.addDevice(devicename, function (data) {
    console.log(data.authToken);
    var deviceId = data.deviceId;
    console.log(data);

    server.addToDb(devicename, data, function (data) {
      console.log(data);
    })

    if (data.authToken) {
      response.send(data.authToken);
    }
    else {
      response.send("");
    }
  });
});



app.post("/adddev", function (request, response) {

  var devicename = request.body.devicename;
  var devicetype = request.body.devicetype;
  var classname = request.body.deviceclass;
  var subject = request.body.devicedesc;

  console.log(classname + " " + subject);
  //found=devicename.match(/[a-z]{1,7}/);
  //if(found)
  //{
  server.regDevice(devicename, devicetype, classname, subject, function (data) {
    console.log(data.authToken);
    var deviceId = data.deviceId;
    mydbiot.insert(data, deviceId, function (err) {
      if (err) {
        return console.log('[mydbiot.insert] ', err.message);
      }
    });
    response.send("Device Added successfully. Auth Token is : " + data.authToken);
  });
  //}
  //else
  //{
  //response.send("Error!! Please Enter valid name");
  //}
});


app.get("/", function (request, response) {
  server.getDevices(function (data) {
    console.log(data);
    response.send(data);
  });
});

app.delete("/del", function (request, response) {
  var dev = request.body.name;
  console.log(dev);
  server.delDevice(dev, function (data) {
    console.log("data: " + data);
    response.send(data);
  });

});

app.post("/graph", function (request, response) {
  var m1 = request.body.m;
  var id = request.body.array;
  server1.getData(m1, id, function (data) {
    console.log(data);
    response.send(data);
  });
});

app.get("/mapping", function (request, response) {
  map.getData(function (data) {
    response.send(data);
  });
});

app.get("/cities", function (request, response) {
  city.getData(function (data) {
    response.send(data);
  });
});


// app.post("/devicediscovery", function (request, response) {
//   var deviceId=request.body.deviceId;
//   var desc="device";
//   console.log(deviceId);
//   disc.deviceDisc(deviceId,desc,function(data){
//     response.send(data);
//   })
//   console.log(deviceId);
//   response.send("200 ok");
// });

app.get("/dtype", function (request, response) {
  type.getTypes(function (data) {
    //console.log(data);
    response.send(data);
  });
});


module.exports = app;