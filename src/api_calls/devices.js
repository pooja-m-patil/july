var cfenv = require("cfenv");
var request = require("request");
var auth=require("./credentials");


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

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    //console.log(body);
    // console.log(body.bookmark);
    callback(body);
  });

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

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log("body");
  console.log(body);
  //console.log(body.docs[0].data.authToken);
  
  //var temp=JSON.parse(body);
  //console.log(temp);
  //console.log(temp.docs[0]);
  callback(body);
});


}