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
  var options = { method: 'POST',
  url: auth.DBURL+'register/_find',
  headers:auth.DBAUTH,
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
      jwt.sign({emailId:body.docs[0]._id,expiresIn:Date.now()+300000000},'secretkey',(err,token)=>{
        callback({token:token});
      })
    }
    else{
      callback({token:false});
    }
    }
  });
}