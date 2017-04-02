var AWS = require("aws-sdk");
console.log('Loading Login function');

var db = new AWS.DynamoDB.DocumentClient()

exports.handler = function(event, context,callback) {
     var username  = event.name;
     var email = event.email;
     var address = event.address;
     var password=event.password;
     var AWS = require("aws-sdk");

    var table = "customer";

    var params = {
        TableName: table,
        Key:{
            "email": email
        }
    };
    console.log(username);
    db.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            
            callback(null, false);
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            
            // temp = JSON.dumps(data);
            // console.log(data["Item"]["password"]);
            // console.log(password);
            if (password == data["Item"]["password"]) {
                callback(null, true);
            }
                callback(null, false);
        }
    });
}