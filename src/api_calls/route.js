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


app.post("/datafetch", function (request, response) {
  var name = request.body.name;
  server.getDevicesInfo(name, function (data) {
    response.json(data);
  });
});

// app.post("/addNewDevice", function (request, response) {

//   var devicename = request.body.devicename;

//   server.addDevice(devicename, function (data) {
//     var deviceId = data.deviceId;

//     server.addToDb(devicename, data, function (data) {
//     })

//     if (data.authToken) {
//       response.send(data.authToken);
//     }
//     else {
//       response.send("");
//     }
//   });
// });



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

// app.get("/adminlist", function (request, response) {
//   console.log("admin list");
//   // list.connList(function (data) {
//      response.send("data");
//   // })
// })

app.get("/", function (request, response) {
  console.log("fetch data");
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

  var d1 = request.body.d1;
  var d2 = request.body.d2;
  var dId = request.body.dId;

  server1.getData(d1,d2,dId, function (data) {
    console.log(d1+" "+d2+" "+dId);
    console.log(data);
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

// app.get("/dtype", function (request, response) {
//   type.getTypes(function (data) {
//     response.send(data);
//   });
// });

module.exports = app;