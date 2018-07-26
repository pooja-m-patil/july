// Firstly we'll need to import the fs library
var express = require("express");
var app = express();
var fs = require('fs');

var Logger = exports.Logger = {};

var infoStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

var errorStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

var debugStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

Logger.info = function(msg,api) {
  var message =  "info : " + msg  + "\n";
  infoStream.write(message);
};

Logger.debug = function(msg) {
  var message = "debug : " + msg + "\n";
  debugStream.write(message);
};

Logger.error = function(msg) {
  var message = "error : " + msg + "\n";
  errorStream.write(message);
};

Logger.url = function(msg) {
  var message = "url : " + msg + "\n";
  accessLogStream.write(message);
};