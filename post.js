const express = require("express");
const router = express.Router();

router.route("/").get(function (req, res) {
  res.send("GET");
});
router.route("/").post(function (req, res) {
  res.send("POST");
});
module.exports = router;
