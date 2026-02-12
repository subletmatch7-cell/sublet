const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const { requireRole } = require("../middleware/role.middleware");
const { createCheckoutSession } = require("../controllers/payment.controller");

router.post(
  "/checkout",
  protect,
  requireRole("lister"),
  createCheckoutSession
);

module.exports = router;
