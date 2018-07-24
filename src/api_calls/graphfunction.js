var cfenv = require("cfenv");
var request = require("request");
var auth=require("./credentials");
var nodeRedDb;
temp: any = {};


// load local VCAP configuration  and service credentials

exports.getData = function (d1, d2, dId, callback) {

  console.log("getData");
  console.log(d1);
  console.log(d2);

  var options = {
    method: 'POST',
    url: auth.DBURL+'real_time_device_data/_find',
    headers:auth.DBAUTH,
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