console.log('Loading function');
var doc = require('dynamodb-doc');
var db = new doc.DynamoDB();
exports.handler = function(event, context,callback) 
{
     var id=event.id;
     var email = event.email;
     var itemList = event.itemList;
     var totalPrice=event.totalPrice;
    console.log(email + "," + itemList+ ","+ totalPrice );
var tableName = "order";

var item = {
     "oid":id,
     "email":  email,
     "itemList": itemList,
     "totalPrice":totalPrice
};
 var params = {
     TableName:tableName, 
     Item: item
 };

console.log(params);
var flag=false;
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