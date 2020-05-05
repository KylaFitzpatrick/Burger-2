var express = require("express");
var bodyParser = require("body-parser");
var PORT = process.env.PORT || 3000;

var db = require("./models");
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
require("./routes/burgers-api-routes.js")(app);
require("./routes/customers-api-routes.js")(app);

// Start our server so that it can begin listening to client requests.
db.sequelize.sync({ force: false }).then(function() {
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
});
