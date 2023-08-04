const express = require("express");
const router = express.Router();

router.route("/").get(function (req, res) {
  res.send("GET FRom USER");
});
router.route("/:id").get(function (req, res) {
  console.log(req.params);
  res.send("GET URL QUERY " + req.params.id);
});

module.exports = router;
