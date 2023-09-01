const jwt = require("jsonwebtoken");
const User = require("../models/user");
const checkAuth = async (req, res, next) => {
  if (req.session.token) {
    try {
      const token = req.session.token;
      const decode = await jwt.verify(token, "SECRET_KEY");
      if (!decode) {
        req.flash("error", "User Id Not Found");
        res.redirect("/users/login");
      }
      const user = await User.findById(decode.id);
      if (!user) {
        req.flash("error", "User Not Found");
        return res.redirect("/users/login");
      }
      req.user = user;
      next();
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/users/login");
    }
  } else {
    res.redirect("/users/login");
  }
};

const checkLoginPage = (req, res, next) => {
  if (req.session.token) {
    console.log(req.url);
    if (req.url === "/login" || req.url === "/register") {
      res.redirect("/posts/dashboard");
    }
  }
  next();
};

module.exports = {
  checkAuth,
  checkLoginPage,
};
