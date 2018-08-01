var request = require("request");

exports.restClient=function(options) {
    return new Promise((resolve, reject) => {
      request(options, function (error, response, body) {
        if (error) {
          reject({Error:error.message})
        } else if (response.statusCode === 200 || response.statusCode === 201) {
          resolve({data:response.body})
        } else if (response.statusCode === 404) {
          reject({Error:response.body})
        } else if (response.statusCode === 403) {
          reject({Error:"Forbidden"})
        } else {
          reject({Error:response.body});
        }
        console.log(response.statusCode);
        console.log(response.body)
      })
    })
  }