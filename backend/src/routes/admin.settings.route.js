const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const { requireRole } = require("../middleware/role.middleware");

const {
  updateProfile,
  updatePassword
} = require("../controllers/admin.settings.controller");

router.use(protect, requireRole("admin"));

router.put("/profile", updateProfile);
router.put("/password", updatePassword);


module.exports = router;