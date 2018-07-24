var cfenv = require("cfenv");
var request = require("request");
var login;
var bcrypt=require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);
var LocalStrategy=require('passport-local').Strategy;
const passport = require('passport');
const jwt=require('jsonwebtoken');
var auth=require("./credentials");

exports.getLoginInfo=function(uname,pass,callback)
{
  console.log("function");

  var request = require("request");

  var options = { method: 'POST',
  url: auth.dbUrl+'register/_find',
  headers: 
   { 'postman-token': '40968373-8aee-480d-1f8d-590ab69b704b',
     'cache-control': 'no-cache',
     'content-type': 'application/json',
     authorization: auth.dbAuth
     },
  body: 
   { selector: { _id: { '$gt': '0' }, _id: uname },
     sort: [ { _id: 'asc' } ] },
  json: true };

  request(options, function (error, response, body) {
   if (error) throw new Error(error);

    console.log(body);
    if(body.bookmark=='nil'){
      callback({token:false});
    }
    else{
    var pwd=body.docs[0].Password;
  
    const user={
      username:body.docs[0]._id,
    }

    
    let status=bcrypt.compareSync(pass,pwd);
    if(status){
      console.log("true");
      jwt.sign(body.docs[0]._id,'secretkey',(err,token)=>{
        callback({username:body.docs[0]._id,token});
      })
    }
    else{
      callback({token:false});
    }
    }
  });
}