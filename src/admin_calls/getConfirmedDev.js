var auth = require("../api_calls/credentials");


exports.userConnDevices=function(callback){
    
  var request = require("request");

  var options = { method: 'POST',
    url: auth.DBURL+'confirmed_request/_find',
    headers: auth.DBAUTH,
    body: 
     { selector: { _id: { '$gt': '0' } },
       fields: [ '_id','_rev','username','locationname','latitude','longitude' ],
       sort: [ { _id: 'asc' } ] },
    json: true };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    console.log("devices list");
    console.log(body);
    callback(body);
  }); 
}