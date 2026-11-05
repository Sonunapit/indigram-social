const express = require("express");
const { registerController, loginController } = require("../controller/auth.contoller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

router.get("/me", authMiddleware, (req, res) => {
  const { password, ...user } = req.user.toObject();
  res.json({ user });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

module.exports = router;