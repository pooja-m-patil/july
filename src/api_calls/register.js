var cfenv = require("cfenv");
var request = require("request");
var register;
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);
var auth = require("./credentials");


exports.registerUser = function (uname, pass, callback) {
  let hash = bcrypt.hashSync(pass, salt);

  var request = require("request");

  var options = {
    method: 'POST',
    url: auth.DBURL + 'register',
    headers:auth.DBAUTH,
    body: { _id: uname, Password: hash },
    json: true
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body.ok);
    callback(body.ok);
  });
}