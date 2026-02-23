const router = require("express").Router();
const { register, login, forgotPassword, resetPassword } = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);

// Password reset routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
