exports.confirmUserReq=function(dId,data,username,location,lat,lng,callback)
{
    console.log(dId);

    var request = require("request");

    var options = { method: 'POST',
    url: 'https://722fa7b8-0c41-4d59-ac8c-1c02d25eaef5-bluemix.cloudant.com/confirmed_request',
    headers: 
    {   'postman-token': 'a08510ca-b697-ef14-a07d-452880a4ff4b',
        'cache-control': 'no-cache',
        authorization: 'Basic NzIyZmE3YjgtMGM0MS00ZDU5LWFjOGMtMWMwMmQyNWVhZWY1LWJsdWVtaXg6YjdkZGQyOGJmNzU1ODk1Nzg4NjA3NDU3YmRmMjgyZGJmNzJkY2EzMTg3YzA1ZDIwMTZjYjAzNGU5MDI1MDFhNw==',
        'content-type': 'application/json' },
    body: 
    {   _id: dId,
        username: username,
        locationname: location,
        latitude: lat,
        longitude: lng },
        json: true };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        callback(body);
    });
}