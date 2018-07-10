var express = require("express");
var app = express();
var cfenv = require("cfenv");
var request = require("request");
var bodyParser = require('body-parser');
var req=require('../user_calls/reqconn');
var usrDev=require('../user_calls/userDevices')
//var conn=require('./_calls/conn')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/reqconn", function (request, response) {
    
    var rId=request.body.rId;
    var username=request.body.username;
    var locationname=request.body.locationname;
    var latitude=request.body.latitude;
    var longitude=request.body.longitude;
    console.log('user req');

    req.reqDevice(rId,username,locationname,latitude,longitude,function(data){

    response.send(data);
  });
})

app.post("/confirmed_devices", function (request, response) {
    
  var username=request.body.uname;
 
  console.log('user req');

  usrDev.confirmedUserDevices(username,function(data){

  response.send(data);
});
})
// app.post("/requested_conn", function (request, response) {
    
//   console.log('requested conn');
//   conn.getConnections(function(data){
//   response.send(data);
// });
//})


  module.exports=app;