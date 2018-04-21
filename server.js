var express = require("express");
var bodyParser = require("body-parser");
var routes = require('./controllers/burger_controller')


var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

var port = process.env.PORT || 3000;

app.use(routes)


app.listen(port, function() {
  console.log("listening on port", port);
});