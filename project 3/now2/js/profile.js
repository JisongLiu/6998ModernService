var API_URL = 'https://fqa9vsks99.execute-api.us-east-1.amazonaws.com/production/profile';
var SNS_URL = 'https://fqa9vsks99.execute-api.us-east-1.amazonaws.com/production/snstoslack';
           $(document).ready(function(){
            $('#cong').empty();
            $('#sendemail').empty();
              var name;
              var email;
              var address;
              var sendemail=localStorage.getItem('email');
              console.log("ready");
               $.ajax({
                   type: "POST",
                   url: API_URL,
                   data: JSON.stringify({"email":sendemail}),
                   success: function(data){
                          console.log(data);
                          console.log("data get");
                          name=data["name"];
                          email=data["email"];
                          address=data["address"];
                          document.getElementById("name").innerHTML = name;
                          document.getElementById("email").innerHTML = email;
                          document.getElementById("address").innerHTML = address;

                   }
               });
           });
            $('#edit').on('click', function(){
                var subject = "edit";
                var newEmail = document.getElementById("email").innerHTML;
                var newAddress =  document.getElementById("address").innerHTML;
                var newName = document.getElementById("name").innerHTML;
                var message = newName + " edited his profile";
                $.ajax({
                   type: "PUT",
                   url: API_URL,
                   data: JSON.stringify({"email":newEmail,"address":newAddress,"name":newName}),
                   success: function(data){
                          var update = "Your profile has been updated successfully.";
                          document.getElementById("sendEmails").innerHTML = update;
                   }
               });
                $.ajax({
                   type: "POST",
                   url: SNS_URL,
                   data: JSON.stringify({"subject":subject,"message":message}),
                   success: function(data){
                          var success = "Your message has been posted to slack";
                          document.getElementById("cong").innerHTML = success;
                   }
               });
                
            });
            $('#delete').on('click', function(){
               var subject = "delete";
                var newEmail = document.getElementById("email").innerHTML;
                var newAddress =  document.getElementById("address").innerHTML;
                var newName = document.getElementById("name").innerHTML;
                var message = newName + " deleted his profile";
               
                $.ajax({
                   type: "DELETE",
                   url: API_URL,
                   headers: {"ID":newEmail},
                   success: function(data){
                          console.log(data);
                          window.location.href='login.html';
                   }
               });
                $.ajax({
                   type: "POST",
                   url: SNS_URL,
                   data: JSON.stringify({"subject":subject,"message":message}),
                   success: function(data){
                          window.location.href='login.html';
                   }
               });
                
            });