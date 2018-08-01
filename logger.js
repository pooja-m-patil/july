var fs = require('fs');

var Logger = exports.Logger = {};

var infoStream = fs.createWriteStream('./access.log', {flags: 'a'});

var errorStream = fs.createWriteStream('./access.log', {flags: 'a'});

var debugStream = fs.createWriteStream('./access.log', {flags: 'a'});

var warnStream = fs.createWriteStream('./access.log', {flags: 'a'});


Logger.info = function(msg) {
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

Logger.warn = function(msg) {
  var message = "warn : " + msg + "\n";
  warnStream.write(message);
};