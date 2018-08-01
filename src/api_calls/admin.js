var app = require('./route');
var cfenv = require("cfenv");
var request = require("request");
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


//Fetching all devices info along with connected user.
app.get("/connections", function (request, response) {
  list.connList(function (data) {
    response.send({data});
  })
})


//To show user requests to admin.
app.get("/user-connections", function (request, response) {

  console.log('requested conn');
  conn.getConnections(function (data) {
    response.send({data});
  });
})

//Fetching devices.
app.get("/ibm-devices", function (request, response) {

  addDev.getIOTDevice(function (data) {
    response.send({data});
  })
})

//Adding information about devices connected to users.
app.post("/connections", function (request, response) {

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

        rev.getRev(lat, lng, function (data1) {

          var options = {
            method: 'DELETE',
            url: auth.DBURL + 'connection_request/' + data1._id,
            qs: { rev: data1._rev },
            headers: auth.DBAUTH
          };

          req(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
          });
          response.send({data});
        });
      })
    }
  });
})

//Editing connection.
app.patch("/connections", function (request, response) {

  var uname = request.body.username;
  var locname = request.body.locationname;
  var lat = request.body.latitude;
  var lng = request.body.longitude;
  var dId = request.body.deviceId;
  var newDId = request.body.devId;

  fetchDoc1.fetchDoc(dId, function (data1) {
    var devId = data1.docs[0]._id;
    var data = data1.docs[0].data;

    rev.getRevOfCnfDevices(lat, lng, function (data) {

      var options = {
        method: 'DELETE',
        url: auth.DBURL + 'confirmed_request/' + data._id,
        qs: { rev: data._rev },
        headers: auth.DBAUTH
      };

      req(options, function (error, res, body) {
        if (error) throw new Error(error);

        confirm.confirmUserReq(newDId, data1, uname, locname, lat, lng, function (data) {
          response.send({data});
        });
      });
    })
  })
});

// app.get("/getRealTimeData", function (request, response) {
//   devData.getDeviceData(function (data2) {
//     response.send(data2);
//   })
// })

//Displaying devices.
app.get('/user-devices', function (request, response) {
  console.log("devices");
  getDev.userConnDevices(function (data) {
    response.send({data});
  })
})


module.exports = app;