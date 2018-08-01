var cfenv = require("cfenv");
var request = require("request");
var auth = require("./credentials");
var rev = require('../admin_calls/rev');
var resHandler = require('./response-handler.js');
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
      callback(response.body);
  });
}


//Fetch devices.
exports.getDevices = function (callback) {
    var options = {
      method: 'GET',
      url: auth.IBMURL + 'iotbootcamp/devices',
      headers: auth.IBMAUTH
    };
    let res = resHandler.restClient(options);
    res.then((msg)=>{
      callback(msg)
    },(error)=>{
      callback(error);
  })
  
}

//Delete Device.............
exports.delDevice = function (devName, callback) {
  var name = devName
  var options = {
    method: 'DELETE',
    url: auth.IBMURL + "iotbootcamp/devices/" + devName,
    headers: auth.IBMAUTH
  };
    let res = resHandler.restClient(options);

    rev.getRevOfDevices(devName, function (data1) {
        var options = {
          method: 'DELETE',
          url: auth.DBURL + 'mydbiot/' + data1._id,
          qs: { rev: data1._rev },
          headers: auth.DBAUTH
        };
        let res1 = resHandler.restClient(options);
        res1.then((msg)=>{
          callback(msg)
        },(error)=>{
          callback(error);
      })
    })
}


//Fetching Authentication Token for selected device.
exports.getDevicesInfo = function (id, callback) {
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
    let res = resHandler.restClient(options);
    res.then((msg)=>{
      callback(msg)
    },(error)=>{
      callback(error);
  })
}


//Add device to Db.
exports.addToDb = function (id, data, callback) {
    var options = {
      method: 'POST',
      url: auth.DBURL + 'mydbiot',
      headers: auth.DBAUTH,
      body: { _id: id, data: data },
      json: true
    };
    let res = resHandler.restClient(options);
    res.then((msg)=>{
      callback(msg)
    },(error)=>{
      callback(error);
  })  
}