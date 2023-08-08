const express = require("express");
const router = express.Router();
const Post = require("./models/post");
router.route("/create").get(function (req, res) {
  res.render("createpost", { title: "Create Post" });
});
router.route("/dashboard").get(async function (req, res) {
  const posts = await Post.find({});
  console.log(posts);
  res.render("dashboard", { posts });
});
router.route("/dashboard/:id").get(async function (req, res) {
  const { id } = req.params;
  const post = await Post.findById(id);
  res.render("post", { post });
});
router.route("/edit/:id").get(async function (req, res) {
  const { id } = req.params;
  const post = await Post.findById(id);
  res.render("edit_post", { post });
});
router.route("/update").post(async function (req, res) {
  const { id, title, content } = req.body;
  await Post.findByIdAndUpdate(id, { title, content });
  res.redirect("/posts/dashboard");
});
router.route("/createpost").post(function (req, res) {
  const { title, content } = req.body;
  Post.create({ title, content })
    .then((result) => {
      res.redirect("/posts/dashboard");
    })
    .catch((err) => console.log(err));
});
module.exports = router;
