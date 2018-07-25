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
const jwt=require('jsonwebtoken');


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




app.post("/register", function (request, response) {
  var uname = request.body.email;
  var pass1 = request.body.pass1;
  console.log(uname + " " + " " + pass1);
  reg.registerUser(uname, pass1, function (data) {
    console.log(data);
    response.send(data);
  });
});


app.get("/data/:deviceId", function (request, response) {
  var deviceId = request.params.deviceId;
  server.getDevicesInfo(deviceId, function (data) {
    response.json(data);
  });
});


app.post("/adddev", function (request, response) {

  var devicename = request.body.devicename;
  var devicetype = request.body.devicetype;
  var classname = request.body.deviceclass;
  var subject = request.body.devicedesc;

  console.log(classname + " " + subject);
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
});

app.post("/login", function (request, response) {
  console.log("hello");

  var uname = request.body.username;
  var pasw = request.body.password;

  server2.getLoginInfo(uname, pasw, function (data) { 
  console.log("login");
  console.log(data);
  response.send(data);
});

});

app.get("/devices", function (request, response) {
  console.log("fetch data");
  server.getDevices(function (data) {
    console.log(data);
    response.send(data);
  });
});

//Delete device from IBM IOT platform
app.delete("/devices/:deviceId", function (request, response) {
  var deviceId = request.params.deviceId;
  server.delDevice(deviceId, function (data) {
    response.send(data);
  });
});

app.get("/graph/:deviceId", function (request, response) {

  var deviceId=request.params.deviceId;
  var date1=request.query.date1;
  var date2=request.query.date2;

  server1.getData(date1,date2,deviceId, function (data) {
    response.send(data);
  });
})


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


app.post("/devices", function (request, response) {

  var devicename = request.body.devicename;

  server.addDevice(devicename, function (data) {
    console.log(data.authToken);
    var deviceId = data.deviceId;
    console.log(data);

    server.addToDb(devicename, data, function (data) {
      console.log(data);
    })

    if (data.authToken) {
      response.json(data.authToken);
    }
    else {
      response.send("");
    }
  });
});

module.exports = app;