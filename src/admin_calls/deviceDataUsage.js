var request = require("request");

exports.getDeviceData = function (dId, callback) {
console.log("device data");
    var options = {
        method: 'POST',
        url: 'https://722fa7b8-0c41-4d59-ac8c-1c02d25eaef5-bluemix.cloudant.com/real_time_device_data/_find',
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
                fields: ['usage'],
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

        //console.log(body);
        //console.log(body.docs[0]);
        callback(body);
    });

}

exports.insertDataIntoDatabase = function (payload, callback) {
    console.log(payload);
    var devId=payload.deviceId;
    var usage=payload.usage;
    var time=payload.time

    var options = { method: 'POST',
      url: 'https://722fa7b8-0c41-4d59-ac8c-1c02d25eaef5-bluemix.cloudant.com/real_time_device_data',
      headers: 
       { 'postman-token': '08283fe2-cd3a-bb6d-24bf-dea186b43344',
         'cache-control': 'no-cache',
         authorization: 'Basic NzIyZmE3YjgtMGM0MS00ZDU5LWFjOGMtMWMwMmQyNWVhZWY1LWJsdWVtaXg6YjdkZGQyOGJmNzU1ODk1Nzg4NjA3NDU3YmRmMjgyZGJmNzJkY2EzMTg3YzA1ZDIwMTZjYjAzNGU5MDI1MDFhNw==',
         'content-type': 'application/json' },
      body: { deviceId: devId, usage: usage, timestamp: time },
      json: true };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      //console.log(body);
    });
}