var cfenv = require("cfenv");
var request = require("request");


exports.getTypes =function(callback)
{
  console.log("get types");
  var request = require("request");

  var options = { method: 'GET',
    url: 'https://tgacg8.internetofthings.ibmcloud.com/api/v0002/device/types',
    headers: 
     { 'postman-token': 'c70ca712-e01c-e486-7e57-2d4044d16f2d',
       'cache-control': 'no-cache',
       'content-type': 'application/json',
       authorization: 'Basic YS10Z2FjZzgtcDNoZXlmMWMxZzpvRm1jZ1RlaUNCd0BRNCp2aig=' } };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(response.body);
    console.log();
    callback(body);
  });
}