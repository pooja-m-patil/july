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

        // app.post("/connectDevice", function (request, response) {
        //   var id=request.body.deviceId;
        //   console.log("deviceId"+id);
        //   if(id==dId){
        //     response.send(id);
        //   }
        // })
        rev.getRev(lat, lng, function (data) {

          var options = {
            method: 'DELETE',
            url: 'https://722fa7b8-0c41-4d59-ac8c-1c02d25eaef5-bluemix.cloudant.com/connection_request/'+data._id,
            qs: { rev: data._rev },
            headers:
              {
                'postman-token': 'a84462a0-1404-84c6-2681-a51bcf22bea1',
                'cache-control': 'no-cache',
                authorization: 'Basic NzIyZmE3YjgtMGM0MS00ZDU5LWFjOGMtMWMwMmQyNWVhZWY1LWJsdWVtaXg6YjdkZGQyOGJmNzU1ODk1Nzg4NjA3NDU3YmRmMjgyZGJmNzJkY2EzMTg3YzA1ZDIwMTZjYjAzNGU5MDI1MDFhNw==',
                'content-type': 'application/json'
              }
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

// app.delete("/delRegD", function (request, response) {
//   var dId=request.body.dId;
//   del.delRegDev(dId,function(data){
//     response.send(data);
//   })
// })

// app.post("/connectDevice", function (request, response) {
//     var id=request.body.deviceId;
//     console.log("deviceId"+id);
//     // if(id==dId){
//       response.send({"deviceId":id});
//     // }
//   })


app.get('/getConfirmedDevices', function (request, response) {
  getDev.userConnDevices(function (data) {
    response.send(data);
  })
})


module.exports = app;