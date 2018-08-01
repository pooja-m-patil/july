var express = require("express");
var app = express();
var cfenv = require("cfenv");
var request = require("request");
var express1 = require('express-validation');
var function1 = require('./functions.js');
var server2 = require('./login.js');
var multipart = require('connect-multiparty');
var bodyParser = require('body-parser');
var function2 = require('./graphfunction');
//var disc=require('./discovery.js');
var map = require('./map.js');
var city = require('../city.js');
var reg = require('./register.js');
var promises=require("promises")



// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));





//Registratiion for new user.
app.post("/register", function (request, response) {
  var uname = request.body.email;
  var pass1 = request.body.pass1;
  console.log(uname + " " + " " + pass1);
  reg.registerUser(uname, pass1, function (data) {
    console.log(data);
    response.send({data});
  });
});

//Authentication token for selected device Id.
app.get("/auth-tokens/:deviceId", function (request, response) {
  var deviceId = request.params.deviceId;
  function1.getDevicesInfo(deviceId, function (data) {
    response.json(data);
  });
});

//Fetching all devices from IBM IOT platform.
app.get("/devices", function (request, response) {
  console.log("fetch data");
  function1.getDevices(function (data) {
    response.send(data);
  });
});

//Delete device from IBM IOT platform
app.delete("/devices/:deviceId", function (request, response) {
  var deviceId = request.params.deviceId;
  function1.delDevice(deviceId, function (data) {
    response.send({data});
  });
});

//Fetching information of devices for generating graphs.
app.get("/graphs/:deviceId", function (request, response) {

  var deviceId=request.params.deviceId;
  var date1=request.query.date1;
  var date2=request.query.date2;

  function2.getData(date1,date2,deviceId, function (data) {
    response.send(data);
  });
})

//Displaying all devices present in selected location.
app.get("/mappings", function (request, response) {
  map.getData(function (data) {
    response.send({data});
  });
});

//Showing all cities where devices are allocated.
app.get("/cities", function (request, response) {
  city.getData(function (data) {
    response.send({data});
  });
});

//Adding a new device on IOT platform and Cloudant db.
app.post("/devices", function (request, response) {

  var devicename = request.body.devicename;

  function1.addDevice(devicename, function (data) {
    console.log(data.authToken);
    var deviceId = data.deviceId;
    console.log(data);

    function1.addToDb(devicename, data, function (data) {
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


// errHandler.getStatusCode().then((msg)=>{
//   console.log(msg); 
//  });

module.exports = app;