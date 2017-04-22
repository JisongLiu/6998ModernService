var stripeToken="";
 var stripeEmail="";
 var stripeAmount="";
 var itemList=localStorage.getItem('itemList');
// var oid=localStorage.getItem('oid');
var userName=localStorage.getItem('userName');
 $(document).ready(function(){
 	var totalPrice=localStorage.getItem('totalPrice');
 	console.log(typeof totalPrice);
 	console.log(totalPrice);
 	document.getElementById("results").innerHTML = totalPrice;
});
 $('#stripe-button').click(function(){
          var token = function(res){
            console.log("payment click");
          	stripeToken=res.id;
          	stripeEmail=res.email;
            var $id = $('<input type=hidden name=stripeToken />').val(res.id);
            var $email = $('<input type=hidden name=stripeEmail />').val(res.email);
            $('form').append($id).append($email).submit();
          };

          var amount = String(parseInt(localStorage.getItem('totalPrice'))*100);
          stripeAmount=amount;
          StripeCheckout.open({
            key:         'pk_test_Vm8ya7i6VGaQpEURHFfyzYPl',
            amount:      amount,
            name:        'Pay the Products',
            description: 'Have a happy day',
            panelLabel:  'Checkout',
            token:       token
          });
          

          return false;
        });
 	$('#myForm').submit(function(e){
 		var API_URL2='https://fqa9vsks99.execute-api.us-east-1.amazonaws.com/production/stripepay';
    console.log("form submit");
    console.log("stripeToken",stripeToken);
 		$.ajax({
                    type: "POST",
                    url: API_URL2,
                    data: JSON.stringify({"userName":userName,"itemList":itemList,"token":stripeToken,"email":stripeEmail,"totalPrice":stripeAmount}),
                    contentType: "application/json",
                    headers: {'Authorization': 'Bearer ' + localStorage.getItem('JWTtoken')},
                    success: function(data){
                        console.log("Pay the order successfully");
                        //localStorage.setItem('totalPrice', totalPrice);
                        window.location.href='final.html';
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        
                            window.location.href='login.html';
                   
                    }
                });
                return false;
 	});
