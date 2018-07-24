var auth = require("../api_calls/credentials");


exports.getConnections=function(callback){
    var request = require("request");

    var options = { method: 'POST',
    url: auth.DBURL+'connection_request/_find',
    headers: auth.DBAUTH,
    body: 
    {   selector: { _id: { '$gt': '0' } },
        fields: [ 'username', 'locationname','latitude','longitude' ],
        sort: [ { _id: 'asc' } ] },
        json: true };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);
    //console.log(body);
    callback(body);
    });
}