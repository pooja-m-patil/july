var request = require("request");
var auth = require("../api_calls/credentials");


exports.getDeviceData = function (dId, callback) {
console.log("device data");
    var options = {
        method: 'POST',
        url: auth.DBURL+'real_time_device_data/_find',
        headers:auth.DBAUTH,
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
        url: auth.DBURL+'confirmed_request/_find',
        headers:auth.DBAUTH,
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
      url: auth.DBURL+'real_time_device_data',
      headers: auth.DBAUTH,
      body: { deviceId: devId, usage: usage, timestamp: time },
      json: true };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      //console.log(body);
    });
}