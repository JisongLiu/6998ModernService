function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validatePassword(password, secPassword) {
  return password == secPassword;
}
//Email validation and check the password
function validate() {
  var email = $("#email").val();
  var password = $("#password").val();
  var password_check = $("#password_check").val();
  
  if (validateEmail(email) && validatePassword(password, password_check)) {
    return true;
  } else {
    
    if (!validateEmail(email)) {
      document.getElementsByTagName('input')[1].style.border = "1px solid rgba(255,0,0,0.6)";
      $('#emailMention').empty().append("Email address is not valid :(");
    } else {
      document.getElementsByTagName('input')[3].style.border = "1px solid rgba(255,0,0,0.6)";
      $('#passwordMention').empty().append("Two Passwords are not the same :(");
    } 
          
    return false;
  }
}
// $("#validate").bind("click", validate);
// Different Lambda functions' API           
var API_URL = 'https://fqa9vsks99.execute-api.us-east-1.amazonaws.com/production/createcustomer';
var SES_URL = 'https://fqa9vsks99.execute-api.us-east-1.amazonaws.com/production/automatically_send_emails';
var SNS_URL = 'https://fqa9vsks99.execute-api.us-east-1.amazonaws.com/production/sns';
            $('#submitButton').on('click', function(){
              
              // Clear the style data
              $('#nameMention').empty();
              $('#emailMention').empty();
              $('#passwordMention').empty();
              $('#cong').empty();
              $('#success').empty();
              $('#sendEmails').empty();
              $('#sendAdvertisements').empty();
              document.getElementsByTagName('input')[0].style.border = "1px solid rgba(255,255,255,0.6)";
              document.getElementsByTagName('input')[1].style.border = "1px solid rgba(255,255,255,0.6)";
              document.getElementsByTagName('input')[3].style.border = "1px solid rgba(255,255,255,0.6)";
              document.getElementById('sendEmails').style.color = "#fff";
              document.getElementById('sendAdvertisements').style.color = "#fff";

              
              // Check the input couldn't be null
              if($('#username').val()==""){
                    document.getElementsByTagName('input')[0].style.border = "1px solid rgba(255,0,0,0.6)";
                    $('#nameMention').empty().append("You haven't inputted your name.");
                    return false;
                }
              if($('#email').val()==""){
                    document.getElementsByTagName('input')[1].style.border = "1px solid rgba(255,0,0,0.6)";
                    $('#emailMention').empty().append("You haven't inputted your email.");
                    return false;
                }
              if($('#password').val()==""){
                    document.getElementsByTagName('input')[3].style.border = "1px solid rgba(255,0,0,0.6)";
                    $('#passwordMention').empty().append("You haven't inputted your password.");
                    return false;
                }

              if (validate() == true) {
                $.ajax({
                    type: "POST",
                    url: API_URL,
                    data: JSON.stringify({ "name": $('#username').val(), "email": $('#email').val(), "password": $('#password').val(), "address": $('#address').val()}),
                    contentType: "application/json",
                    success: function(data){
                      //First check if you could register successfully, check the account.
                      if (data == true) {
                        $('#cong').empty().append("Congratulations!");
                        $('#success').empty().append("You have registered successfully!");
                        var receiver = {
                          "email": $("#email").val()
                        }
                        //Then send email automatically
                        $.ajax({
                          type: "POST",
                          url: SES_URL,
                          data: JSON.stringify(receiver),
                          contentType: "application/json",
                          success: function(data){
                            if (data == "ok") {
                             
                              $('#sendEmails').empty().append("We have sent you a confirmation email."+'<br>'+"Please check your mailbox. :)");
              
                            } else {
                
                               document.getElementById('sendEmails').style.color = "red";
                              $('#sendEmails').empty().append("Confirmation Email Sent Failed. :(");
                            }
                            //check the advertisement subscribe
                            if ($("#subscribe").is(':checked') == true) {
                              $.ajax({
                                type: "POST",
                                url: SNS_URL,
                                data: JSON.stringify({"email": $("#email").val()}),
                                contentType: "application/json",
                                success: function(data){
                                  if (data == true) {
                                    // $("#entries").css("color", "green");
                                    $('#sendAdvertisements').empty().append("Thank you for subscribing our advertisements.");

                                  } else {
                                    // $("#entries").css("color", "red");
                                    document.getElementById('sendAdvertisements').style.color = "red";
                                    $('#sendAdvertisements').empty().append("Subscribe our advertisements failed. :(");
                
                                  }
                                }
                              });
                            }
                          }
                        });
                      } else if (data == false) {
                        document.getElementsByTagName('input')[1].style.border = "1px solid rgba(255,0,0,0.6)";
                        $('#emailMention').empty().append("You have already registered, please go to login.");
                      }
                    }
                });
                return false;
              }
                
            });