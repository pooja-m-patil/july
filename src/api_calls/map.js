var cfenv = require("cfenv");
var request = require("request");
var auth=require("./credentials");

exports.getData=function(callback)
{
    var options = { method: 'POST',
      url: auth.DBURL+'map/_find',
      headers: auth.DBAUTH,
      body: { selector: { _id: { '$gt': '0' } }, sort: [ { _id: 'asc' } ] },
      json: true };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
      callback(body);
    });
}