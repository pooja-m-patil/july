var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser');
var request = require("request");
var express1 = require('express-validation');
var router = express.Router();

var route = require('./src/api_calls/route');
var user = require('./src/api_calls/user');
var admin = require('./src/api_calls/admin');
var socketIo = require('socket.io');
var watson = require('./src/api_calls/watson_service');
var dev = require('./src/api_calls/devices');
var status;
var auth;
var deviceId;
var temp;
var socket1;
var initArray = [];
var Client = require("ibmiotf");
var totalUsage = 0;
var devData = require('./src/admin_calls/deviceDataUsage');
var allDevUsage = [];
var rejectDevices=[];

var server = app.listen(3000, function () {
  console.log("Listening on port:3000");
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/display', route);
app.use('/display', user);
app.use('/display', admin);
app.use('/display', watson);

devicesObj = {
  devArray: [],
  find: function (uid) {
    return this.devArray.findIndex(dev => dev.uid === uid);
  },
  splice: function (uid) {
    this.devArray.splice(this.find(uid), 1);
  },
  pick: function () {
    return this.devArray.map(device => device.uid);
  },
  emit: function () {
    initArray = this.devArray.slice(0);
    socket1.emit("Available devices", this.pick());
  },
  setTimer: function (uid) {
    return setTimeout(() => {
      this.splice(uid);
      this.emit();
    }, 8000)
  },
  resetTimer: function (uid) {
    let timer = this.devArray[this.find(uid)].timer
    clearTimeout(timer);
    this.devArray[this.find(uid)].timer = this.setTimer(uid);
  },
  add: function (uid) {
    console.log("uid" + uid);

    if (this.find(uid) === -1) {  // Device not available
      device = {
        uid,
        timer: this.setTimer(uid)
      }
      this.devArray.push(device);
      this.emit();
    } else { // Device already availbale
      this.resetTimer(uid);
    }
  }
}

var io = socketIo(server);

io.on('connection', (socket) => {
  console.log("A new WebSocket connection has been established");
  socket1 = socket;
})

app.post("/remoteApp", function (req, res) {

  if (req.body.deviceId) {
    deviceId = req.body.deviceId;
  }
  if (req.body.added) {
    status = true;
    auth = req.body.added;
  }
  if (req.body.id) {
    temp = req.body.id;
  }

  if (status) {
    if (temp == deviceId) {
      res.send({ Authentication_Token: auth });
    }
    else {
      res.send("");
    }
  }
  else {
    var uid = req.body.deviceId;
    dev.devices(uid, function (data) {
      if (data.bookmark != 'nil') {
        // if (data.bookmark == undefined) 
        // {
        //   res.send("");
        //   return;
        // }
        dev.authAvailable(uid, function (data) {
          console.log(data);
          if (data.bookmark != 'nil') {
            res.send({ Authentication_Token: data.docs[0].data.authToken })
          }
        })

        devicesObj.add(uid);

      }
      else {
        res.send({ Message: "Not valid device" });
        return;
      }
    });
  }
})

app.post("/real-time-data", function (req, res) {


  var loc = req.body.location;
  console.log(loc);

  var appClientConfig = {
    "org": 'tgacg8',
    "id": 'myapp',
    "auth-key": 'a-tgacg8-p3heyf1c1g',
    "auth-token": 'oFmcgTeiCBw@Q4*vj('
  };

  var appClient = new Client.IotfApplication(appClientConfig);


  appClient.connect();

  appClient.on("connect", function () {

    appClient.subscribeToDeviceEvents("+", loc, "status");

  });

  appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {

    console.log("Device Event from :: " + deviceType + " : " + deviceId + " of event " + eventType + " with payload : " + payload);
    var temp = JSON.parse(payload);
    console.log(temp.d.usage)
    socket1.emit("device data", { "usage": temp.d.usage, "time": temp.d.time });
  });
  res.send("data");
})


var appClientConfig = {
  "org": 'tgacg8',
  "id": 'myapp',
  "auth-key": 'a-tgacg8-p3heyf1c1g',
  "auth-token": 'oFmcgTeiCBw@Q4*vj('
};

var appClient = new Client.IotfApplication(appClientConfig);


appClient.connect();



appClient.on("connect", function () {

  rejectDevices=[];
  //console.log(rejectDevices);
  appClient.subscribeToDeviceEvents("+", '+', "status");

});

appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {

  //console.log("Device Event from :: " + deviceType + " : " + deviceId + " of event " + eventType + " with payload : " + payload);
  var temp = JSON.parse(payload);
  //console.log(temp);
  //console.log(temp.d.deviceId)
  var devId = temp.d.deviceId;

  devData.getDeviceData(devId, function (data) {
    totalUsage = 0;
    //console.log(data);

    for (let i = 0; i < data.docs.length; i++) {
      totalUsage = totalUsage + data.docs[i].data.d.usage;
    }
    // console.log(data.docs[0].data);
    // console.log(data.docs[1].data);

      devData.getUserName(devId, function(data){
        var uname=data.docs[0].username;
     



    console.log(totalUsage);
    if (allDevUsage.length) {
      for (let i = 0; i < allDevUsage.length; i++) {
        if (allDevUsage[i].deviceId == devId) {
          allDevUsage[i].usage = totalUsage;
          //console.log(allDevUsage);
        }
        else {
          allDevUsage.push({ "uname":uname, "deviceId": devId, "usage": totalUsage });
          //console.log(allDevUsage);
        }
      }
    }
    else {
      allDevUsage.push({ "uname":uname, "deviceId": devId, "usage": totalUsage });
      //console.log(allDevUsage);
      socket1.emit("total device usage", allDevUsage);

    }

    for(let i=0;i<allDevUsage.length;i++){
      console.log("for loop");
      if(rejectDevices.includes(allDevUsage[i].deviceId)){
        appClient.publishDeviceCommand("iotbootcamp", allDevUsage[i].deviceId, "reboot", "json", { "status": "close" });
        allDevUsage.splice(i,1);
        console.log("dev");
        console.log(allDevUsage);
          
      
      }
    }
    socket1.emit("total device usage", allDevUsage);
    //console.log(allDevUsage);
   
    app.post("/stop-conn", function (req, res) {

      var dId1=req.body.devId;
      appClient.publishDeviceCommand("iotbootcamp", dId1, "reboot", "json", { "status": "close" });
      //appClient.disconnect();

      if(!rejectDevices.includes(dId1)){
        rejectDevices.push(dId1);
      }
      //console.log("reject")
      //console.log(rejectDevices)

      res.send("Device connection stopped successfully");
    })
    
  })
  //socket1.emit("device data",{"usage":temp.d.usage,"time":temp.d.time});
});
});


app.get("/initarray", function (req, res) {
  res.send(devicesObj.emit());
})

// app.post("/connectDevice", function (request, response) {
//   var id=request.body.deviceId;
//   console.log("deviceId"+id);
//   // if(id==dId){
//     response.send({"deviceId":id});
//   // }
// })


module.exports = app;