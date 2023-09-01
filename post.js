const express = require("express");
const router = express.Router();
const Post = require("./models/post");
const multer = require("multer");
const path = require("path");
const { checkAuth } = require("./middlewares/checkAuth");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "./images"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now() + file.originalname}`);
  },
});

const upload = multer({ storage });
router.route("/create").get(function (req, res) {
  res.render("createpost", { title: "Create Post" });
});
router.route("/dashboard").get(checkAuth, async function (req, res) {
  console.log(req.session.token);
  const posts = await Post.find({});
  console.log(posts);
  res.render("dashboard", { posts, user: req.user });
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
router.route("/delete/:id").delete(async function (req, res) {
  const { id } = req.params;
  await Post.findByIdAndDelete(id);
  res.redirect("/posts/dashboard");
});
router.route("/createpost").post(function (req, res) {
  const { title, content } = req.body;
  console.log(title);
  console.log(req.file);
  Post.create({ title, content })
    .then((result) => {
      res.redirect("/posts/dashboard");
    })
    .catch((err) => console.log(err));
});
router.post(
  "/upload_file/:id",
  upload.single("images"),
  async function (req, res) {
    const { id } = req.params;
    await Post.findByIdAndUpdate(id, { images: req.file.filename });
    res.redirect("/posts/dashboard");
  }
);
module.exports = router;
