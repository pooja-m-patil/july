exports.fetchDoc=function(id,callback){

    var request = require("request");

    var options = {
        method: 'POST',
        url: 'https://722fa7b8-0c41-4d59-ac8c-1c02d25eaef5-bluemix.cloudant.com/mydbiot/_find',
        headers:
            {
                'postman-token': 'c4eb73b7-2765-9197-e165-6da7e9117094',
                'cache-control': 'no-cache',
                authorization: 'Basic NzIyZmE3YjgtMGM0MS00ZDU5LWFjOGMtMWMwMmQyNWVhZWY1LWJsdWVtaXg6YjdkZGQyOGJmNzU1ODk1Nzg4NjA3NDU3YmRmMjgyZGJmNzJkY2EzMTg3YzA1ZDIwMTZjYjAzNGU5MDI1MDFhNw==',
                'content-type': 'application/json'
            },
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

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(response.body);
        callback(response.body);

    });
}