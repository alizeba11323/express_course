const express = require("express");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { checkLoginPage } = require("./middlewares/checkAuth");
const router = express.Router();

router.route("/register").get(checkLoginPage, function (req, res, next) {
  res.render("register", { title: "Register User" });
});
router.route("/login").get(checkLoginPage, function (req, res, next) {
  res.render("login", { title: "Login Page" });
});
router.route("/login").post(async function (req, res) {
  const { email, password } = req.body;
  if (!email) {
    req.flash("error", "Email is required");
    return res.redirect("/users/login");
  }
  if (!password) {
    req.flash("error", "Password is Required");
    return res.redirect("/users/login");
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error", "User Not Found");
      return res.redirect("/users/login");
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      req.flash("error", "Password Not Matched");
      return res.redirect("/users/login");
    }
    const token = await jwt.sign({ id: user._id }, "SECRET_KEY", {
      expiresIn: "1d",
    });
    req.flash("success", "Login Successfully");
    req.session.token = token;
    req.session.save((err) => {
      res.redirect("/posts/dashboard");
    });
  } catch (err) {
    req.flash("error", err.message);
    return res.redirect("/users/login");
  }
});
router.route("/register").post(async function (req, res) {
  try {
    const { name, username, email, password } = req.body;
    if (!name) {
      req.flash("error", "Name is required");
      return res.redirect("/users/register");
    }
    if (!username) {
      req.flash("error", "Username is required");
      return res.redirect("/users/register");
    }
    if (!email) {
      req.flash("error", "Email is Required");
      return res.redirect("/users/register");
    }
    if (!password) {
      req.flash("error", "Password is Required");
      return res.redirect("/users/register");
    } else if (password.length < 8) {
      req.flash("error", "Password must be 8 charecter");
      return res.redirect("/users/register");
    }
    const user = await User.findOne({ email });
    if (user) {
      req.flash("error", "User Already Exists");
      return res.redirect("/users/register");
    }
    const salt = await bcryptjs.genSalt(12);
    const hash = await bcryptjs.hash(password, salt);
    await User.create({
      name,
      email,
      username,
      password: hash,
    });
    req.flash("success", "Register Successfully");
    res.redirect("/users/login");
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/users/register");
  }
});
router.route("/logout").post(function (req, res) {
  console.log(req.session.token);
  if (req.session.token) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err.message);
      } else {
        res.clearCookie("connect.sid");
        res.redirect("/users/login");
      }
    });
  }
});

module.exports = router;
