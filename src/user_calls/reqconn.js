var dbData;

exports.reqDevice = function (rId, username, locationname, latitude, longitude, callback) {
    console.log("Request conn");

    var request = require("request");

        var options = {
            method: 'POST',
            url: 'https://722fa7b8-0c41-4d59-ac8c-1c02d25eaef5-bluemix.cloudant.com/connection_request',
            headers:
                {
                    'postman-token': '90715978-59e3-0f2a-9513-1455d1bd3eab',
                    'cache-control': 'no-cache',
                    authorization: 'Basic NzIyZmE3YjgtMGM0MS00ZDU5LWFjOGMtMWMwMmQyNWVhZWY1LWJsdWVtaXg6YjdkZGQyOGJmNzU1ODk1Nzg4NjA3NDU3YmRmMjgyZGJmNzJkY2EzMTg3YzA1ZDIwMTZjYjAzNGU5MDI1MDFhNw==',
                    'content-type': 'application/json'
                },
            body: { rId: rId, username: username, locationname: locationname, latitude: latitude, longitude: longitude },
            json: true
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(body);
            callback(body.ok);
        });
}
