console.log('Loading function');
      var doc = require('dynamodb-doc');
      var db = new doc.DynamoDB();
exports.handler = function(event, context,callback) 
{
     
var tableName = "order";

 var params = {
     TableName:tableName, 
 };
var flag=false;
var count=0;
 db.scan(params,function(err,data){
     if (err) {console.log("fail");console.log(err);
         callback(null,0);
     }
     else{ console.log("success");
         console.log(data);
         count=data['Count'];
         callback(null,count);
     }
 });
 
};