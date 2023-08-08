const express = require("express");
const router = express.Router();
const users = [];
router.route("/").get(function (req, res) {
  res.render("index", {
    title: "create user",
  });
});
router.route("/:id").get(function (req, res) {
  const { id } = req.params;
  const user = users.find((user) => user.id == id);
  res.render("SingleUser", { user });
});
router.route("/createUser").post(function (req, res) {
  const { name, email, password, phone_number } = req.body;
  users.push({ id: users.length + 1, name, email, password, phone_number });
  res.render("dashboard", { users });
});
module.exports = router;
