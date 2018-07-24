var auth = require("../api_calls/credentials");


exports.connList = function (callback) {
    var request = require("request");

    var options = {
        method: 'POST',
        url: auth.DBURL+'confirmed_request/_find',
        headers:auth.DBAUTH,
        body: { selector: { _id: { '$gt': '0' } }, sort: [{ _id: 'asc' }] },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        callback(body);
    });
}