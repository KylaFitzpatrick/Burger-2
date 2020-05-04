
var db = require("../models");
// Create all our routes and set up logic within those routes where required.
module.exports = function(app) {

app.get("/", function(req, res) {

    db.Burger.findAll({}).then(function(dbBurger) {
            res.render("index", {
               burgers: dbBurger 
            })
            console.log(dbBurger)
        })
          
    });
   
  
  app.post("/api/burgers/", function(req, res) {
    db.Burger.create({
      burger_name: req.body.burger_name,
      devoured: false
    }).then(function(dbBurger){
        res.json(dbBurger)
      })
  });
  
  app.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);

    db.Burger.update(
      req.body,
      // devoured: req.body.boolean === "true"
      {
        where: {
          id: condition
        }
        
      }).then(function(dbBurger) {
        res.json(dbBurger) 
      })
  });

  app.delete("/api/burgers/:id", async function(req, res) {
    // var condition = "id = " + req.params.id;
     db.Burger.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbBurger) {
      res.json(dbBurger)
      if (dbBurger.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }); 
});
};
