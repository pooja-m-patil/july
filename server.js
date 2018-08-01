var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser');
var request = require("request");
var express1 = require('express-validation');
var router = express.Router();
var cors = require('cors');
var cookieParser = require('cookie-parser');
//var tracer=require('tracer').colorConsole();
var morgan = require('morgan')
var path = require('path');
var socketIo = require('socket.io');
var watson = require('./src/api_calls/watson_service');
var dev = require('./src/api_calls/devices');
var route = require('./src/api_calls/route');
var login = require('./src/api_calls/login-user');
var user = require('./src/api_calls/user');
var admin = require('./src/api_calls/admin');
const jwt = require('jsonwebtoken');
var favicon = require('serve-favicon');
var cors = require('cors');
var logger = require('./logger').Logger;
var fs = require('fs');

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
var rejectDevices = [];
var deviceIdPresent = false;
var devId;
var api;

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

var server = app.listen(3000, function () {
  console.log("Listening on port:3000");
});

var io = socketIo(server);

io.on('connection', (socket) => {
  console.log("A new WebSocket connection has been established");
  socket1 = socket;
})

app.post("/discovery", function (req, res) {

  console.log("device discovery");
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
    var deviceId = req.body.deviceId;
    dev.devices(deviceId, function (data2) {
      if (data2.bookmark != 'nil') {
        dev.authAvailable(deviceId, function (data1) {
          if (data1.data.bookmark != 'nil') {
            res.send({ Authentication_Token: data1.data.docs[0].data.authToken })
          }
          else {
            console.log("nil");
            devicesObj.add(deviceId);
          }
        })
      }
      else {
        res.send({ Message: "Not valid device" });
        return;
      }
    });
  }
})

app.use('/logs', login);

app.use(function (req, res, next) {

  const getLoggerForStatusCode = (statusCode) => {
    if (statusCode >= 500) {
      logger.error(`${new Date().toISOString()},${req.method} ${req.originalUrl}, ${res.statusCode}, Server Error`);
    }
    else if (statusCode >= 400) {
      logger.warn(`${new Date().toISOString()},${req.method} ${req.originalUrl}, ${res.statusCode}, Client Error`);
    }
    else if (statusCode >= 300) {
      logger.debug(`${new Date().toISOString()},${req.method} ${req.originalUrl}, ${res.statusCode}, Unmodified`);
    }
    else if (statusCode == 200) {
      logger.info(`${new Date().toISOString()},${req.method} ${req.originalUrl}, ${res.statusCode}, Ok`);
    }
  }

  const msg = getLoggerForStatusCode(res.statusCode);

  var tokenHeader = req.headers['authorization'];
  var decodeToken = jwt.decode(tokenHeader, 'secretkey');

  if (tokenHeader != undefined) {
    if (decodeToken.expiresIn >= Date.now()) {
      next();
    }
    else {
      res.json({ "token": "invalid" });
    }
  }
})

// var accessLogStream = fs.createWriteStream('./access.log', {flags: 'a'});
// app.use(morgan('common', {stream: accessLogStream}));

app.use('/apis', route);
app.use('/admin-apis', admin);
app.use('/user-apis', user);
app.use('/watson', watson);


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


var appClientConfig = {
  "org": 'tgacg8',
  "id": 'myapp',
  "auth-key": 'a-tgacg8-p3heyf1c1g',
  "auth-token": 'oFmcgTeiCBw@Q4*vj('
};


var appClient = new Client.IotfApplication(appClientConfig);

appClient.connect();

appClient.on("connect", function () {
  allDevUsage = [];
  appClient.subscribeToDeviceEvents("+", '+', "status");
});

appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {

  var temp = JSON.parse(payload);
  devId = temp.d.deviceId;
  var realTimeData = temp.d.usage;
  var timeStamp = temp.d.time;

  devData.insertDataIntoDatabase(temp.d, function (data) {
  });

  devData.getDeviceData(devId, function (data2) {
    deviceIdPresent = false;
    totalUsage = 0;

    for (let i = 0; i < data2.docs.length; i++) {
      totalUsage = totalUsage + data2.docs[i].usage;
    }

    devData.getUserName(devId, function (data) {
      if (data.bookmark != 'nil') {
        var uname = data.docs[0].username;

        if (allDevUsage.length) {
          for (let i = 0; i < allDevUsage.length; i++) {

            if (allDevUsage[i].deviceId == devId) {
              allDevUsage[i].totalusage = totalUsage;
              allDevUsage[i].currentusage = realTimeData;
              deviceIdPresent = true;
            }
          }
          if (deviceIdPresent == false) {
            allDevUsage.push({ "uname": uname, "deviceId": devId, "currentusage": realTimeData, "totalusage": totalUsage, "timestamp": timeStamp, "status": "Running" });
          }
        }
        else {
          allDevUsage.push({ "uname": uname, "deviceId": devId, "currentusage": realTimeData, "totalusage": totalUsage, "timestamp": timeStamp, "status": "Running" });
        }

        socket1.emit("total device usage", allDevUsage);
      }
    })
  })

  app.put("/connections/:deviceId", function (req, res) {

    var deviceId = req.params.deviceId;
    appClient.publishDeviceCommand("iotbootcamp", deviceId, "reboot", "json", { "status": "Stop" });

    for (let i = 0; i < allDevUsage.length; i++) {
      if (allDevUsage[i].deviceId == deviceId) {
        allDevUsage[i].status = "Stopped";
        socket1.emit("total device usage", allDevUsage);
      }
    }
    res.json("Device connection stopped successfully");
  });


  app.get("/connections/:deviceId", function (req, res) {
    if (req.params.deviceId) {
      var deviceId = req.params.deviceId;
      appClient.publishDeviceCommand("iotbootcamp", deviceId, "reboot", "json", { "status": "Restart" });

      for (let i = 0; i < allDevUsage.length; i++) {
        if (allDevUsage[i].deviceId == deviceId) {
          allDevUsage[i].status = "Running";
          socket1.emit("total device usage", allDevUsage);
          res.json("Device connection restarted successfully");
        }
      }
    }
  })
});

module.exports = app;