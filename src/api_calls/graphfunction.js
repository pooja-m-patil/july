var cfenv = require("cfenv");
var request = require("request");
var nodeRedDb;
temp: any = {};


// load local VCAP configuration  and service credentials

exports.getData = function (d1, d2, dId, callback) {

  console.log("getData");

  var options = {
    method: 'POST',
    url: 'https://722fa7b8-0c41-4d59-ac8c-1c02d25eaef5-bluemix.cloudant.com/real_time_device_data/_find',
    headers:
      {
        'postman-token': 'b45fd7ee-6284-5e9f-4126-2b5cdb6b405c',
        'cache-control': 'no-cache',
        authorization: 'Basic NzIyZmE3YjgtMGM0MS00ZDU5LWFjOGMtMWMwMmQyNWVhZWY1LWJsdWVtaXg6YjdkZGQyOGJmNzU1ODk1Nzg4NjA3NDU3YmRmMjgyZGJmNzJkY2EzMTg3YzA1ZDIwMTZjYjAzNGU5MDI1MDFhNw==',
        'content-type': 'application/json'
      },
    body:
      {
        selector:
          {
            _id: { '$gt': '0' },
            deviceId:dId,
            timestamp:
              {
                '$gt': d1,
                '$lt': d2
              }
          },
        fields: ["deviceId",
        "usage",
        "timestamp"
      ],
        sort: [{"timestamp": "asc"}]
      },
    json: true
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
    callback(response.body.docs);
  });
}