var request = require("request");
var auth=require("../api_calls/credentials");
var dbData;

exports.reqDevice = function (rId, username, locationname, latitude, longitude, callback) {

        var options = {
            method: 'POST',
            url: auth.DBURL+'connection_request',
            headers:auth.DBAUTH,
            body: { rId: rId, username: username, locationname: locationname, latitude: latitude, longitude: longitude },
            json: true
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(body);
            callback(body.ok);
        });
}
