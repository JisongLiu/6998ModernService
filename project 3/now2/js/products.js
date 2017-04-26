var API_URL = ' https://fqa9vsks99.execute-api.us-east-1.amazonaws.com/production/createorder';
            var count=0;
            var total=0;
            var itemList=[];
           $(document).ready(function(){
               $.ajax({
                   type: "GET",
                   url: API_URL,
                   success: function(data){
                          count=data+1;
                          localStorage.setItem('oid', count);
                      
                   }
               });
           });
//*******************************Vue Framework part****************************************************//
const shop = [
  {
    name: "Mac lipstick",
    price: 10,
    src:"static/lipstick.png",
    quantity: 0
  },
  {
    name: "SK II facial essence",
    price: 9,
    src:"static/sk2.png",
    quantity: 0
  },
  {
    name: "Estee Lauder foundation",
    price: 15,
    src:"static/foundation.png",
    quantity: 0
  }
];

const vm = new Vue({
  el: "#app",
  data: {
    items: [],
    shop: shop,
    showCart: false,
    verified: false
  },
  computed: {
    total() {
      total=0;
      itemList=[];
      for(var i = 0; i < this.items.length; i++) {
        total += (this.items[i].price*this.items[i].quantity);
        itemList.push(this.items[i].name);
      }
      return total;
    }
  },
  methods: {
    addToCart(item) {
      item.quantity += 1;
      this.items.push(item);
    },
    removeFromCart(item) {
      item.quantity -= 1;
      this.items.splice(this.items.indexOf(item), 1);
    }
  }
});
//*******************************Vue Framework end***************************************************//
$('#submitButton').on('click', function(){
                console.log("total price",total);
                console.log("clicked!");
                var email=localStorage.getItem('email');
                $.ajax({
                    type: "POST",
                    url: API_URL,
                    data: JSON.stringify({"id":count,"email":email,"itemList": itemList, "totalPrice":total}),
                    contentType: "application/json",
                    headers: {'Authorization': 'Bearer ' + localStorage.getItem('JWTtoken')},
                    success: function(data){
                        console.log('data:', data);
                        console.log("create order successfully");
                        localStorage.setItem('totalPrice', total);
                        localStorage.setItem('itemList',itemList);
                        window.location.href='payment.html';
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                       
                            window.location.href='login.html';
                     
                    }
                });
                return false;
            });