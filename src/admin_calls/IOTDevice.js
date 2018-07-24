var request = require("request");
var auth = require("../api_calls/credentials");


exports.getIOTDevice=function(callback)
{
  var request = require("request");

var options = { method: 'POST',
  url: auth.DBURL+'mydbiot/_find',
  headers: auth.DBAUTH,
  body: 
   { selector: { _id: { '$gt': '0' } },
     fields: [ '_id', '_rev' ],
     sort: [ { _id: 'asc' } ] },
    json: true };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
      //console.log(body);
      callback(body);
  });

}