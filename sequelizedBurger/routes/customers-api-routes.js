
var db = require("../models");
// Create all our routes and set up logic within those routes where required.
module.exports = function(app) {

app.get("/", function(req, res) {

    db.Customer.findAll({
      include: [db.Burger]
    }).then(function(dbCustomer) {

 
      res.render("index", {customers: dbCustomer})
            
            console.log(dbCustomer)
        })
          
    });
   
  
  app.post("/api/customers", function(req, res) {
    db.Customer.create({
      customer_name: req.body.customer_name,
      BurgerId: req.body.BurgerId
    }).then(function(dbCustomer){
      res.json(dbCustomer)
    })
      
  });     

};
