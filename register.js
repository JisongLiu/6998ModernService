var AWS = require('aws-sdk');
var sns = new AWS.SNS({ region: config.AWS_REGION});
console.log('Loading function');
      var doc = require('dynamodb-doc');
      var db = new doc.DynamoDB();
exports.handler = function(event, context,callback) 
{
     var username  = event.name;
     var email = event.email;
     var address = event.address;
     var password=event.password;
    console.log(username + "," + email );
var tableName = "customer";
var item = {
     "name":username,
     "email":  email,
     "address": address,
     "password":password
};
 var params = {
     TableName:tableName, 
     Item: item
 };
     console.log(params);
var flag=false;
 db.getItem()
 db.putItem(params,function(err,data){
     if (err) {
           console.log("fail");console.log(err);
     }
     else{ console.log("success");
         console.log(data);
         flag=true;
     }
       var params = {
        Protocol: 'email',
        TopicArn: arn:aws:sns:us-east-1:106682779689:MyTopics,   // not sure, add a name or url?
        Endpoint: email
      };
       sns.subscribe(params, function(err, data) {
        if (err) {
          console.log(err, err.stack); // an error occurred
        } else {
          console.log('Working signup');
          console.log(data);           // successful response
        }   
      }
      callback(null,flag);
 });
 
};
