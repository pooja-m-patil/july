var request = require("request");

exports.getDeviceData = function (dId, callback) {

    var options = {
        method: 'POST',
        url: 'https://722fa7b8-0c41-4d59-ac8c-1c02d25eaef5-bluemix.cloudant.com/iotp_tgacg8_watercontrol_2018-07/_find',
        headers:
            {
                'postman-token': '8287cf90-09ad-758c-6364-1200ce483037',
                'cache-control': 'no-cache',
                authorization: 'Basic NzIyZmE3YjgtMGM0MS00ZDU5LWFjOGMtMWMwMmQyNWVhZWY1LWJsdWVtaXg6YjdkZGQyOGJmNzU1ODk1Nzg4NjA3NDU3YmRmMjgyZGJmNzJkY2EzMTg3YzA1ZDIwMTZjYjAzNGU5MDI1MDFhNw==',
                'content-type': 'application/json'
            },
        body:
            {
                selector: { _id: { '$gt': '0' }, deviceId: dId },
                fields: ['data.d.usage'],
                sort: [{ _id: 'asc' }]
            },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        //console.log(body);
        callback(body);
    });

}

exports.getUserName = function (dId, callback) {

    var options = {
        method: 'POST',
        url: 'https://722fa7b8-0c41-4d59-ac8c-1c02d25eaef5-bluemix.cloudant.com/confirmed_request/_find',
        headers:
            {
                'postman-token': 'f2c448a2-425b-4a98-540f-d0512dedf0fb',
                'cache-control': 'no-cache',
                authorization: 'Basic NzIyZmE3YjgtMGM0MS00ZDU5LWFjOGMtMWMwMmQyNWVhZWY1LWJsdWVtaXg6YjdkZGQyOGJmNzU1ODk1Nzg4NjA3NDU3YmRmMjgyZGJmNzJkY2EzMTg3YzA1ZDIwMTZjYjAzNGU5MDI1MDFhNw==',
                'content-type': 'application/json'
            },
        body:
            {
                selector: { _id: dId },
                fields: ['username'],
                sort: [{ _id: 'asc' }]
            },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        console.log(body.docs[0]);
        callback(body);
    });

}