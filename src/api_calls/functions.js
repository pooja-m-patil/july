var cfenv = require("cfenv");
var request = require("request");
var auth = require("./credentials");
var mydbiot;
temp: any = {};


//Add new device.
exports.addDevice = function (devicename, callback) {
  var result;
  var options = {
    method: 'POST',
    url: auth.IBMURL + 'iotbootcamp/devices',
    headers: auth.IBMAUTH,
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
    url: auth.IBMURL + 'iotbootcamp/devices',
    headers: auth.IBMAUTH,
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
    url: auth.IBMURL + 'iotbootcamp/devices',
    headers: auth.IBMAUTH
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
    url: auth.IBMURL + "iotbootcamp/devices/" + devName,
    headers: auth.IBMAUTH
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
    url: auth.DBURL + 'mydbiot/_find',
    headers: auth.DBAUTH,
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
    url: auth.DBURL + 'mydbiot',
    headers: auth.DBAUTH,
    body: { _id: id, data: data, reqId: "", username: "", locationname: "", latitude: null, longitude: null },
    json: true
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
}