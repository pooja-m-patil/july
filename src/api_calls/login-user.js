var express = require("express");
var app = express();
var cfenv = require("cfenv");
var request = require("request");
var server2 = require('./login.js');
//var logger=require('morgan');

//app.use(logger('dev'));

app.post("/login", function (request, response) {
   // logger.log("hello");
  
    var uname = request.body.username;
    var pasw = request.body.password;
  
    server2.getLoginInfo(uname, pasw, function (data) { 
    console.log("login");
    console.log(data);
    response.send(data);
  });
  
  });

  module.exports = app;