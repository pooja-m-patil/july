var express = require("express");
var app = express();
var cfenv = require("cfenv");
var request = require("request");
var bodyParser = require('body-parser');
var conn = require('../admin_calls/conn');
var addDev = require('../admin_calls/IOTDevice');
var confirm = require('../admin_calls/confirmUserReq');
//var del=require('./admin_calls/delRegDev');
var getDev = require('../admin_calls/getConfirmedDev');
var fetchDoc1 = require('../api_calls/fetchWholeDoc');
var list = require('../admin_calls/connList')
var rev = require('../admin_calls/rev');
var req = require("request");
var devData = require('../admin_calls/deviceDataUsage');
var auth = require("./credentials");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/adminlist", function (request, response) {
  console.log("admin list");
  list.connList(function (data) {
    response.send(data);
  })
})

app.get("/requested_conn", function (request, response) {

  console.log('requested conn');
  conn.getConnections(function (data) {
    response.send(data);
  });
})

app.get("/getIOTDevices", function (request, response) {

  addDev.getIOTDevice(function (data) {
    response.send(data);
  })
})

app.post("/confirmReq", function (request, response) {

  var uname = request.body.username;
  var locname = request.body.locationname;
  var lat = request.body.latitude;
  var lng = request.body.longitude;
  var dId = request.body.deviceId;

  fetchDoc1.fetchDoc(dId, function (data) {
    console.log(data);
    var devId = data.docs[0]._id;
    var data = data.docs[0].data;

    if (dId == devId) {
      confirm.confirmUserReq(dId, data, uname, locname, lat, lng, function (data) {

        rev.getRev(lat, lng, function (data) {

          var options = {
            method: 'DELETE',
            url: auth.DBURL + 'connection_request/' + data._id,
            qs: { rev: data._rev },
            headers: auth.DBAUTH
          };

          req(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
          });
          response.send(data);
        });
      })
    }
  });
})


app.post("/editConn", function (request, response) {

  var uname = request.body.username;
  var locname = request.body.locationname;
  var lat = request.body.latitude;
  var lng = request.body.longitude;
  var dId = request.body.deviceId;
  var newDId = request.body.devId;

  console.log(uname + " " + locname + " " + newDId);

  fetchDoc1.fetchDoc(dId, function (data1) {
    console.log(data1);
    var devId = data1.docs[0]._id;
    var data = data1.docs[0].data;

    rev.getRevOfCnfDevices(lat, lng, function (data) {

      console.log(data);
      console.log(data._id);
      console.log(data._rev);
      var options = {
        method: 'DELETE',
        url: auth.DBURL + 'confirmed_request/' + data._id,
        qs: { rev: data._rev },
        headers: auth.DBAUTH
      };

      req(options, function (error, res, body) {
        if (error) throw new Error(error);

        console.log(body);

        confirm.confirmUserReq(newDId, data1, uname, locname, lat, lng, function (data) {
          console.log(data);
          console.log("data");
          response.send(data);
        });
      });
    })
  })
});

app.get("/getRealTimeData", function (request, response) {
  console.log("real time data");
  devData.getDeviceData(function (data2) {
    response.send(data2);
  })
})


app.get('/getConfirmedDevices', function (request, response) {
  getDev.userConnDevices(function (data) {
    response.send(data);
  })
})


module.exports = app;