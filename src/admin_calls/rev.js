var request = require("request");
var auth = require("../api_calls/credentials");


exports.getRev=function(lat,lng,callback)
{
var options = { method: 'POST',
  url: auth.DBURL+'connection_request/_find',
  headers: auth.DBAUTH,
  body: 
   { selector: 
      { _id: { '$gt': '0' },
        latitude: lat,
        longitude: lng },
     fields: [ '_id', '_rev' ],
     sort: [ { _id: 'asc' } ] },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
  callback(body.docs[0]);
});
}

exports.getRevOfCnfDevices=function(lat,lng,callback)
{
var options = { method: 'POST',
  url: auth.DBURL+'confirmed_request/_find',
  headers: auth.DBAUTH,
  body: 
   { selector: 
      { _id: { '$gt': '0' },
        latitude: lat,
        longitude: lng },
     fields: [ '_id', '_rev' ],
     sort: [ { _id: 'asc' } ] },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log("body");
  callback(body.docs[0]);
});
}

