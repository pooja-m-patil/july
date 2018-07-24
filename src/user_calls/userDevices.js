var request = require("request");
var auth=require("../api_calls/credentials");

exports.confirmedUserDevices = function (uname,callback) {

    var options = {
        method: 'POST',
        url: auth.DBURL+'confirmed_request/_find',
        headers:auth.DBAUTH,
        body:
            {
                selector: { _id: { '$gt': '0' }, username: uname },
                sort: [{ _id: 'asc' }]
            },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        callback(body);
    });


}