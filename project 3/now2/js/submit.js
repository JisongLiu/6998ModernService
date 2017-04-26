var API_URL = 'https://fqa9vsks99.execute-api.us-east-1.amazonaws.com/production/login';
            $(document).ready(function(){
              localStorage.clear();
           });
            $('#submitButton').on('click', function(){
                $('#entries').empty();
                $('#entries2').empty();
                document.getElementsByTagName('input')[0].style.border = "1px solid rgba(255,255,255,0.6)";
                document.getElementsByTagName('input')[1].style.border = "1px solid rgba(255,255,255,0.6)";
                if($('#email').val()==""){
                    document.getElementsByTagName('input')[0].style.border = "1px solid rgba(255,0,0,0.6)";
                    $('#entries').empty().append("You haven't inputted your email.");
                    return false;
                }
                if($('#password').val()==""){
                    document.getElementsByTagName('input')[1].style.border = "1px solid rgba(255,0,0,0.6)";
                    $('#entries2').empty().append("You haven't inputted your password.");
                    return false;
                }
                $.ajax({
                    type: "POST",
                    url: API_URL,
                    data: JSON.stringify({ "email": $('#email').val(), "password": $('#password').val()}),
                    contentType: "application/json",
                    success: function(data){
                    	if(data["email"]==true && data["password"]==true){
                    		localStorage.setItem('userName', data["userName"]);
                    		localStorage.setItem('email',data["emailBack"]);
                            localStorage.setItem('JWTtoken',data["token"]);
                        	window.location.href='products.html';
                    	}else if (data["email"]==false) {
                    		console.log("email false");
                    		$('#email').val("");
                    		$('#password').val("");
                            document.getElementsByTagName('input')[0].style.border = "1px solid rgba(255,0,0,0.6)";
                    		$('#entries').empty().append("You don't have an account.");
                    	}else {
                    		console.log("password false");
                    		$('#password').val("");
                            document.getElementsByTagName('input')[1].style.border = "1px solid rgba(255,0,0,0.6)";
                    		$('#entries2').empty().append("You have inputted the wrong password.");
                    	}
                    }
                });
                return false;
            });