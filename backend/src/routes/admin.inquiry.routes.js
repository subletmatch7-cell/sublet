const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const { requireRole } = require("../middleware/role.middleware");
const Inquiry = require("../models/Inquiry");

router.use(protect, requireRole("admin"));

router.get("/", async (req, res) => {
  const inquiries = await Inquiry.find()
    .populate("listing", "title")
    .populate("lister", "name email");

  res.json(inquiries);
});

module.exports = router;
