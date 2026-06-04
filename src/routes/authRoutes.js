const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authenticate = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorize");
 
router.post(
  "/register",
  authController.register
);

router.post(
  "/login",
  authController.login
);

router.get(
  "/profile",
  authenticate,
  authController.profile
);

router.get(
  "/admin",
  authenticate,
  authorize("ADMIN"),
  (req, res) => {
    res.json({
      message: "Welcome Admin"
    });
  }
);

module.exports = router;