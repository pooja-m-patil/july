exports.getConnections=function(callback){
    var request = require("request");

    var options = { method: 'POST',
    url: 'https://722fa7b8-0c41-4d59-ac8c-1c02d25eaef5-bluemix.cloudant.com/connection_request/_find',
    headers: 
    {   'postman-token': '17f4f5ef-bba7-7cea-cab2-eea7d082b159',
        'cache-control': 'no-cache',
        authorization: 'Basic NzIyZmE3YjgtMGM0MS00ZDU5LWFjOGMtMWMwMmQyNWVhZWY1LWJsdWVtaXg6YjdkZGQyOGJmNzU1ODk1Nzg4NjA3NDU3YmRmMjgyZGJmNzJkY2EzMTg3YzA1ZDIwMTZjYjAzNGU5MDI1MDFhNw==',
        'content-type': 'application/json' },
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