var cfenv = require("cfenv");
var request = require("request");
var nodeRedDb;
temp:any={};


// load local VCAP configuration  and service credentials



exports.getData=function(m1,id,callback)
{

  var request = require("request");

var options = { method: 'POST',
  url: 'https://722fa7b8-0c41-4d59-ac8c-1c02d25eaef5-bluemix.cloudant.com/iotp_tgacg8_watercontrol_2018-0'+m1+'/_find',
  headers: 
   { 'postman-token': '21c7b716-c077-06fa-c9a9-220fd67e63d5',
     'cache-control': 'no-cache',
     'content-type': 'application/json',
     authorization: 'Basic NzIyZmE3YjgtMGM0MS00ZDU5LWFjOGMtMWMwMmQyNWVhZWY1LWJsdWVtaXg6YjdkZGQyOGJmNzU1ODk1Nzg4NjA3NDU3YmRmMjgyZGJmNzJkY2EzMTg3YzA1ZDIwMTZjYjAzNGU5MDI1MDFhNw==' },
  body: 
   { selector: { _id: { '$gt': '0' }, deviceId: id },
     fields: [ '_id', '_rev', 'deviceId', 'data', 'timestamp' ],
     sort: [ { _id: 'asc' } ] },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
  callback(response.body.docs);
});

  
}