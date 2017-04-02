require("stripe")("sk_test_tg28F5W3F6E8rEcLZktp3PLQ")
exports.handler = (event, context, callback) => {
    var stripe = require("stripe")("sk_test_tg28F5W3F6E8rEcLZktp3PLQ");
    var email=event.email;
    var token=event.token;
    var totalPrice=event.totalPrice;
    stripe.customers.create({
        email: email,
        source: token,
    }).then(function(customer) {
        // YOUR CODE: Save the customer ID and other info in a database for later.
    return stripe.charges.create({
         amount: totalPrice,
         currency: "usd",
         customer: customer.id,
    });
    }).then(function(charge) {
    });

    callback(null, 'Hello from Lambda');
};