exports.confirmedUserDevices = function (uname,callback) {

    var request = require("request");

    var options = {
        method: 'POST',
        url: 'https://722fa7b8-0c41-4d59-ac8c-1c02d25eaef5-bluemix.cloudant.com/confirmed_request/_find',
        headers:
            {
                'postman-token': '8ac40b02-caa5-3580-6ef4-08e341277ad3',
                'cache-control': 'no-cache',
                authorization: 'Basic NzIyZmE3YjgtMGM0MS00ZDU5LWFjOGMtMWMwMmQyNWVhZWY1LWJsdWVtaXg6YjdkZGQyOGJmNzU1ODk1Nzg4NjA3NDU3YmRmMjgyZGJmNzJkY2EzMTg3YzA1ZDIwMTZjYjAzNGU5MDI1MDFhNw==',
                'content-type': 'application/json'
            },
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