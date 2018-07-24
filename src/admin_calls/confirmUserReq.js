var auth = require("../api_calls/credentials");

exports.confirmUserReq=function(dId,data,username,location,lat,lng,callback)
{
    console.log(dId);

    var request = require("request");

    var options = { method: 'POST',
    url: auth.DBURL+'confirmed_request',
    headers: auth.DBAUTH,
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



