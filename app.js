const express = require("express");
const app = express();
const morgan = require("morgan");

const Blog = require("./models/blog");
// connect to Database
const dbURL =
  "mongodb+srv://Samuel:Samuel0428@nodepractice.0ijb5.mongodb.net/node-tuts?retryWrites=true&w=majority";
const mongoose = require("mongoose");
mongoose
  .connect(dbURL)
  // start to listen for request after connected to database
  .then((result) => {
    app.listen(3000);
    console.log("connect to db");
  })
  .catch((err) => {
    console.log(err);
  });
// register view engine
app.set("view engine", "ejs");

// // console out info of every request
// app.use(morgan("dev"));

// middleware for static files
app.use(express.static("public"));

let blogs = [
  { title: "First blog", content: "fsdnfjksdfnjsnfjnsjnfsjanf" },
  { title: "Second blog", content: "fsdnfjksdfnjsnfjnsjnfsjanf" },
  { title: "Third blog", content: "fsdnfjksdfnjsnfjnsjnfsjanf" },
];

app.get("/", (req, res) => {
  // res.render("home", { title: "Home", blogs });
  res.redirect("/blogs");
});
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/create", (req, res) => {
  res.render("create", { title: "Create" });
});

// // adding new blog
// app.get("/newBlog", (req, res) => {
//   const newBlog = new Blog({
//     title: "New Blog 2",
//     snippet: "fajsnfjdsanf",
//     body: "dfsadjbfjsabf",
//   });
//   newBlog
//     .save()
//     .then((result) => {
//       res.send(result);
//       console.log("new blog is saved");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// // see all blogs
// app.get("/allBlog", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// // search for blog
// app.get("/searchBlog", (req, res) => {
//   Blog.findById("61d5ff3fc2bda35630686040")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

app.use((req, res) => {
  res.render("404", { title: "404" });
  res.status(404);
});
