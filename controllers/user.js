const passport = require("passport");
const User = require("../model/user.js");
module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password, confirmPassword } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
    });

    return res.status(201).json({
      success: true,
      message: "Registration Successful",
      user: {
        username: registeredUser.username,
        email: registeredUser.email,
      },
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

module.exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: info.message,
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      return res.status(200).json({
        success: true,
        message: "Login Successful",
        user: {
          username: user.username,
          email: user.email,
        },
      });
    });
  })(req, res, next);
};

module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Logout failed",
      });
    }

    res.json({
      success: true,
      message: "Logout successful",
    });
  });
};
