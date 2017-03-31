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
     if (err) {console.log("fail");console.log(err);
         callback(null,flag);
     }
     else{ console.log("success");
         console.log(data);
         flag=true;
         callback(null,flag);
     }
 });
 
};