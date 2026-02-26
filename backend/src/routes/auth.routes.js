const router = require("express").Router();
const { register, login, forgotPassword, resetPassword, googleAuth } = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);

// Password reset routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Google OAuth route (optional, can be implemented later)
router.post("/google", googleAuth);

module.exports = router;
