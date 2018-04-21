const express = require("express");
const bodyParser = require("body-parser");
const routes = require('./controllers')


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

const port = process.env.PORT || 3000;

app.use(routes)

app.listen(port, function() {
  console.log("listening on port", port);
});