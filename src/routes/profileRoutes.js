const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authMiddleware");
const authController = require("../controllers/authController");

router.put(
  "/change-password",
  authenticate,
  authController.changePassword
);

module.exports = router;