const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.post("/logout", userController.logout);

// Check if user is logged in
router.get("/check", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  }

  return res.status(401).json({
    success: false,
    message: "Please login first",
  });
});

module.exports = router;
