var auth = require("./credentials");
var resHandler = require('./response-handler.js');
var request = require("request");


exports.fetchDoc=function(id,callback){

    var options = {
        method: 'POST',
        url: auth.DBURL+'mydbiot/_find',
        headers:auth.DBAUTH,
        body:
            {
                selector: { _id: id },
                fields:
                    ['_id',
                        'data',
                        'reqId',
                        'username',
                        'locationname',
                        'latitude',
                        'longitude'],
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