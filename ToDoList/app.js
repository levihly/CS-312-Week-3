// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ["Buy food", "Cook food", "Eat food"];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  var date = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  var day = date.toLocaleDateString("en-us", options);

  res.render("list", {today:day, newListItems:items});
});

app.post("/", function(req, res) {
  var item = req.body.newItem;

  if (/\S/.test(item)) {
    items.push(item);
    res.redirect("/");
  }
})

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});

module.exports = app;
