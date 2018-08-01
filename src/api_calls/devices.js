var cfenv = require("cfenv");
var request = require("request");
var auth=require("./credentials");
var resHandler = require('./response-handler.js');


exports.devices = function (dev, callback) {
  var request = require("request");

  var options = {
    method: 'POST',
    url: auth.DBURL+'devices/_find',
    headers:auth.DBAUTH,
    body:
      {
        selector: { _id: dev },
        fields: ['_id', '_rev'],
        sort: [{ _id: 'asc' }]
      },
    json: true
  };

  let res = resHandler.restClient(options);
    res.then((msg)=>{
      callback(msg)
    },(error)=>{
      callback(error);
  })

}

exports.authAvailable = function (dev, callback) {
  var request = require("request");

  var options = { method: 'POST',
  url: auth.DBURL+'mydbiot/_find',
  headers: auth.DBAUTH,
  body: 
   { selector: { _id: dev },
     fields: [ '_id', 'data.authToken' ],
     sort: [ { _id: 'asc' } ] },
  json: true };

  let res = resHandler.restClient(options);
  res.then((msg)=>{
    callback(msg)
  },(error)=>{
    callback(error);
})
}