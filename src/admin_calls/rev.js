var request = require("request");

exports.getRev=function(lat,lng,callback)
{
var options = { method: 'POST',
  url: 'https://722fa7b8-0c41-4d59-ac8c-1c02d25eaef5-bluemix.cloudant.com/connection_request/_find',
  headers: 
   { 'postman-token': '5203fef1-6b3e-0b4f-dcc5-9cd8c7a7c27d',
     'cache-control': 'no-cache',
     authorization: 'Basic NzIyZmE3YjgtMGM0MS00ZDU5LWFjOGMtMWMwMmQyNWVhZWY1LWJsdWVtaXg6YjdkZGQyOGJmNzU1ODk1Nzg4NjA3NDU3YmRmMjgyZGJmNzJkY2EzMTg3YzA1ZDIwMTZjYjAzNGU5MDI1MDFhNw==',
     'content-type': 'application/json' },
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
