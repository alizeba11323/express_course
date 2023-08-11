const express = require("express");
const path = require("path");
const app = express();
const PostRouter = require("./post");
const UserRouter = require("./user");
const ConnectDB = require("./db");
const port = 5000;

//read only request
//post request //create new data database
//put,patch request update database
// delete request delete databse
//routes
// http methods POST GET DELETE PUT PATCH
// GET -- READ
//POST -- CREATE
//DELETE  -- DELETE
// // PUT --update Full content id person collection id select {
//     id:1,
//     name: "",
//     age: ""
// }
// //PATCH -- update partial content update
// {
//     id: 1,
//     name: "",
//     age:""
// }

// app.use(express.json()) //parse express data
// app.use("/users", function (req, res, next) {
//   console.log("start Middleware");
//   next();
// });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("static"));
app.use("/static", express.static("images"));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/posts", PostRouter);
app.use("/users", UserRouter);

// app.use(function (req, res, next) {
//   console.log("End Middleware");
//   next();
// });
// app.get("/app", function (req, res) {
//   res.send("App");
// });
// app.get("*", function (req, res) {
//   res.send("Wrong Route");
// });
// app.get("/", function (req, res) {
//   res.send("Hello World");
// });
// app.get("/hello", function (req, res) {
//   res.send("hello from hello route");
// });
// app.post("/hello", function (req, res) {
//   res.send("Hello from post request");
// });
// app.put("/hello", function (req, res) {
//   res.send("hello from put request");
// });
// app.delete("/hello", function (req, res) {
//   res.send("hello from delete request");
// });

// app.all("/hello", function (req, res) {
//   if (req.method === "GET") {
//     res.send("GET");
//   } else if (req.method === "POST") {
//     res.send("POST");
//   } else if (req.method === "PUT") {
//     res.send("PUT");
//   } else if (req.method === "PATCH") {
//     res.send("PATCH");
//   } else if (req.method === "DELETE") {
//     res.send("DELETE");
//   }
//   res.send("NOT GET ANY RESPONSE");
// });

//server
app.listen(port, function () {
  console.log("app running on port " + port);
  ConnectDB();
});
