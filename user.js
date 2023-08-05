const express = require("express");
const router = express.Router();

router.route("/").get(function (req, res) {
  res.render("index", {
    title: "My New Title",
    message: "Welcome to first page",
    greating: "hello",
  });
});
router.route("/:id([0-9]{5})").get(function (req, res) {
  console.log(req.params);
  res.send("GET URL QUERY " + req.params.id);
});
router.route("/:id/:title").get(function (req, res) {
  // req.params = {id: 10,title: "Hello WOrld "}
  const { id, title } = req.params;
  res.send("GET URL PARAMS " + id + " " + title);
});

module.exports = router;
