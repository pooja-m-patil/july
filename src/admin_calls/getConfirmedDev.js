exports.userConnDevices=function(callback){
    
  var request = require("request");

  var options = { method: 'POST',
    url: 'https://722fa7b8-0c41-4d59-ac8c-1c02d25eaef5-bluemix.cloudant.com/confirmed_request/_find',
    headers: 
     { 'postman-token': 'f85fc860-383d-003a-a9de-4e93ded3c2ee',
       'cache-control': 'no-cache',
       authorization: 'Basic NzIyZmE3YjgtMGM0MS00ZDU5LWFjOGMtMWMwMmQyNWVhZWY1LWJsdWVtaXg6YjdkZGQyOGJmNzU1ODk1Nzg4NjA3NDU3YmRmMjgyZGJmNzJkY2EzMTg3YzA1ZDIwMTZjYjAzNGU5MDI1MDFhNw==',
       'content-type': 'application/json' },
    body: 
     { selector: { _id: { '$gt': '0' } },
       fields: [ '_id','_rev','username','locationname','latitude','longitude' ],
       sort: [ { _id: 'asc' } ] },
    json: true };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    console.log(body);
    callback(body);
  }); 
}