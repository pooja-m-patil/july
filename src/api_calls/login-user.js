var express = require("express");
var app = express();
var cfenv = require("cfenv");
var request = require("request");
var server2 = require('./login.js');

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

  module.exports = app;