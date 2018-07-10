var express = require("express");
var app = express();

var prompt = require('prompt-sync')();
var AssistantV1 = require('watson-developer-cloud/assistant/v1');

// Set up Assistant service wrapper.
var service = new AssistantV1({
    username: 'bf080d0a-4a64-425d-a931-27a0b1d8803a', // replace with service username
    password: '5LLFJtgO403m', // replace with service password
    version: '2018-02-16'
});

var workspace_id = 'fd970b5d-c53d-4ced-b0ca-517efc5d8f0c'; // replace with workspace ID

app.post("/welcome_assistant", function (request, res) {

    service.message({
        workspace_id: workspace_id
    }, processResponse);


    function processResponse(err, response) {
        if (err) {
            console.error(err);
            return;
        }

        if (response.output.text.length != 0) {
            console.log(response.output.text[0]);
            res.send(response.output.text[0]);
        }
    }
})
var txt;

app.post("/watson_assistant", function (request, res) {

    var input = request.body.msg;

    console.log(input);
    var newMessageFromUser = input;

    service.message({
        workspace_id: workspace_id,
        input: { text: newMessageFromUser },
        context: txt,
    }, processResponse)


    function processResponse(err, response) {
        if (err) {
            //console.error(err);
            return;
        }

        if (response.intents != "") {
            //console.log()
            if (response.output.text.length != 0) {
                console.log(JSON.stringify(response, null, 2));
                console.log(response.output.text[0]);
                txt = response.context;
                //console.log(txt);
                res.send(response.output.text[0]);
            }
        }
        else {
            console.log("Err");
            res.send("Error");
        }
    }


});

app.post("/watson_discovery", function (request, res) {

    console.log("Watson discovery");
    var input = request.body.msg;
    var request = require("request");

    var request = require("request");

    var options = { method: 'GET',
      url: 'https://gateway.watsonplatform.net/discovery/api/v1/environments/37f17fbd-8d85-42e1-b847-df0762d9da65/collections/f214a2af-57fe-4a85-91f5-2cd616456a5e/query',
      qs: 
       { query: 'enriched_text.semantic_roles.sentence:'+input,
         highlight: 'true',
         version: '2018-03-05' },
      headers: 
       { 'postman-token': '0a792d62-3bc7-421e-69e6-0f96aa35cfdf',
         'cache-control': 'no-cache',
         'content-type': 'application/json',
         authorization: 'Basic YTUxY2NmMzEtYzAwMy00YjM2LTg0YjAtOThhZjQwZmFjNGVmOmt6NlRhdjZEMjZQWA==' },
      body: { name: 'mycoll' },
      json: true };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      //console.log(body);
    
        console.log(body.results[0])
        res.send(response.body);
    });

})




module.exports = app;