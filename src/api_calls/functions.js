var cfenv = require("cfenv");
var request = require("request");
var auth=require("./credentials");
var mydbiot;
temp: any = {};


//Add new device.
exports.addDevice = function (devicename, callback) {
  var result;
  var options = {
    method: 'POST',
    url: auth.ibmUrl+'iotbootcamp/devices',
    headers:
      {
        'Postman-Token': '8bd972f8-1170-466a-a931-ee93601a6213',
        'Cache-Control': 'no-cache',
        Authorization: auth.ibmAuth,
        'Content-Type': 'application/json'
      },
    body:
      {
        deviceId: devicename,
        deviceInfo:
          {
            serialNumber: '100087',
            manufacturer: 'ACME Co.',
            model: '7865',
            deviceClass: 'A',
            description: 'iot',
            fwVersion: '1.0.0',
            hwVersion: '1.0',
            descriptiveLocation: 'Office 5, D Block'
          }
      },
    json: true
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error)
    else
      console.log(response.body);

    callback(response.body);
  });
}

exports.regDevice = function (devicename, devicetype, classname, subject, callback) {
  console.log(devicename + " " + devicetype + " " + classname + " " + subject);
  var result;
  var options = {
    method: 'POST',
    url: auth.ibmUrl+'iotbootcamp/devices',
    headers:
      {
        'Postman-Token': '8bd972f8-1170-466a-a931-ee93601a6213',
        'Cache-Control': 'no-cache',
        Authorization: auth.ibmAuth,
        'Content-Type': 'application/json'
      },
    body:
      {
        deviceId: devicename,
        deviceInfo:
          {
            serialNumber: '100087',
            manufacturer: 'ACME Co.',
            model: '7865',
            deviceClass: classname,
            description: subject,
            fwVersion: '1.0.0',
            hwVersion: '1.0',
            descriptiveLocation: 'Office 5, D Block'
          }
      },
    json: true
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error)
    else
      console.log(response.body);

    callback(response.body);
  });
}


exports.getDevices = function (callback) {
  console.log("get devices");
  var options = {
    method: 'GET',
    url: auth.ibmUrl+'iotbootcamp/devices',
    headers:
      {
        'Postman-Token': '889a56b4-31d1-461b-8221-b8279337aa38',
        'Cache-Control': 'no-cache',
        Authorization: auth.ibmAuth
      }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    callback(response.body);
  });
}

//Delete Device.............
exports.delDevice = function (devName, callback) {
  var name = devName
  var options = {
    method: 'DELETE',
    url: auth.ibmUrl+"iotbootcamp/devices/" + devName,
    headers:
      {
        'Postman-Token': 'cf551324-1db8-4a48-a59c-d6474111f363',
        'Cache-Control': 'no-cache',
        Authorization: auth.ibmAuth
      }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(response.body);
    callback(response.body);
  })
}

exports.getDevicesInfo = function (id, callback) {
  console.log(id);
  var options = {
    method: 'POST',
    url: auth.dbUrl+'/mydbiot/_find',
    headers:
      {
        'postman-token': 'fed52f4d-d985-f124-04dc-68048e028e27',
        'cache-control': 'no-cache',
        authorization: auth.dbAuth,
        'content-type': 'application/json'
      },
    body:
      {
        selector: { _id: id },
        fields: ['_id', 'data.authToken'],
        sort: [{ _id: 'asc' }]
      },
    json: true
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
    console.log(body.docs[0].data.authToken);
     callback(body.docs[0].data.authToken);
});
}

exports.addToDb = function (id, data, callback) {
  var request = require("request");

  var options = {
    method: 'POST',
    url: auth.dbUrl+'mydbiot',
    headers:
      {
        'postman-token': '305369eb-c300-3bcb-3c9e-0d7056f10878',
        'cache-control': 'no-cache',
        authorization: auth.dbAuth,
        'content-type': 'application/json'
      },
    body: { _id: id, data: data, reqId: "", username: "", locationname: "", latitude: null, longitude: null },
    json: true
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });

}

// exports.getData=function(callback)
// {
//   console.log("map");
//   mydbiot.list({include_docs:true},function(err, data) {
//     console.log('Error:', err);
//     console.log(data.rows);
//     callback(data);
// });
// }
// exports.getLoginInfo=function(id)
// {
//   console.log(id);
//   mydbiot.get('cc8c910b9b7456a0710ac36d21607cfb',function(err, data) {
//     //console.log('Error:', err);
//     console.log(data);
//     //callback(data);
// });
// }