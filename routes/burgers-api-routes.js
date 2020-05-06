
var db = require("../models");
// Create all our routes and set up logic within those routes where required.
module.exports = function(app) {

app.get("/", function(req, res) {

    db.Burger.findAll({ 
      include: [db.Customer]
    }).then(function(dbBurger) {

 
      res.render("index", {burgers: dbBurger})
            console.log(db.Customer)
            console.log(dbBurger)
        })
          
    });
   
  
  app.post("/api/burgers", function(req, res) {
    db.Burger.create({
      burger_name: req.body.burger_name
      // devoured: req.body.devoured,
      // id: req.body.devoured
    }).then(function(dbBurger){
      res.json(dbBurger)
    })
      
  });
  
  app.put("/api/burgers/:id", function(req, res) {
    // var condition = "id = " + req.params.id;
  
    // console.log("condition", condition);
var id = req.params.id;
console.log(id)
console.log(req.body.devoured)
console.log(req.body.name)
console.log(req.body.kyla)
    db.Burger.update({
      devoured: (req.body.devoured==="true")
    },{
        where: {
          id: id
        }
        
      }).then(function(dbBurger) {
        res.json(dbBurger) 
      })
  });

  app.delete("/api/burgers/:id", function(req, res) {
    // var condition = "id = " + req.params.id;
     db.Burger.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbBurger) {
      res.json(dbBurger)
    //   res.render("index", {
    //     burgers: dbBurger
    //  })
      if (dbBurger.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }); 
});
};
