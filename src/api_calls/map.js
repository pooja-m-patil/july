var cfenv = require("cfenv");
var request = require("request");
var auth=require("./credentials");
var resHandler = require('./response-handler.js');

exports.getData=function(callback)
{
    var options = { method: 'POST',
      url: auth.DBURL+'map/_find',
      headers: auth.DBAUTH,
      body: { selector: { _id: { '$gt': '0' } }, sort: [ { _id: 'asc' } ] },
      json: true };
    
      let res = resHandler.restClient(options);
      res.then((msg)=>{
        callback(msg)
      },(error)=>{
        callback(error);
    })
}