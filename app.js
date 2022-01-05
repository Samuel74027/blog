const express = require("express");
const app = express();

// register view engine
app.set("view engine", "ejs");
app.listen(3000);

let blogs = [
  { title: "First blog", content: "fsdnfjksdfnjsnfjnsjnfsjanf" },
  { title: "Second blog", content: "fsdnfjksdfnjsnfjnsjnfsjanf" },
  { title: "Third blog", content: "fsdnfjksdfnjsnfjnsjnfsjanf" },
];

app.get("/", (req, res) => {
  res.render("home", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/create", (req, res) => {
  res.render("create", { title: "Create" });
});

app.use((req, res) => {
  res.render("404", { title: "404" });
});
