// var express = require("express");
// var router = express.Router();
// var burger = require("../models/burger.js")
var db = require("../models");
// Create all our routes and set up logic within those routes where required.
module.exports = function(app) {
app.get("/", function(req, res) {

    // let burgersResponse = await 
    db.Burger.findAll({}).then(function(dbBurger) {
        // if (dbBurger instanceof Error) {
        //     res.json({
        //         message: "There was an error sending the request"
        //     })
        // } else {
            res.render("index", {
               burgers: dbBurger 
            })
            console.log(dbBurger)
        })
          
    });
   
  
  app.post("/api/burgers", function(req, res) {

    // let burgersResponse = await 
    db.Burger.create(req.body
      // burger_name: req.body.burger_name
    ).then(function(dbBurger)
     {
        // Send back the ID 
        res.json(dbBurger)
      })

        // if (burgersResponse instanceof Error) {
        //     res.json({
        //         message: "There was an error sending the request"
        //     })
        // } else {
        //     res.render("index", {
        //        burgers: burgersResponse 
        //     })
        //     console.log(burgersResponse)
        // }
  });
  
  app.put("/api/burgers/:id", function(req, res) {
    // var condition = "id = " + req.params.id;
  
    console.log("condition", condition);

    db.Burger.update(
      req.body,
      // devoured: req.body.boolean === "true"
    
      {
        where: {
          id: req.body.id
        }
        
      }).then(function(dbBurger) {
        res.json(dbBurger) 
      })
    //   if (burgersResponse instanceof Error) {
    //     res.json({
    //         message: "There was an error sending the request"
    //     })
    // } else {
    //     res.render("index", {
    //        burgers: burgersResponse 
    //     })
    //     console.log(burgersResponse)
    // }
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
    // if (burgersResponse instanceof Error) {
    //     res.json({
    //         message: "There was an error sending the request"
    //     })
    // } else {
    //     res.render("index", {
    //        burgers: burgersResponse 
    //     })
    //     console.log(burgersResponse)
    // }
});
};
// Export routes for server.js to use.
// module.exports = router;