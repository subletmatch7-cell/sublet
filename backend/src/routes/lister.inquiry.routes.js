const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const { requireRole } = require("../middleware/role.middleware");
const Inquiry = require("../models/Inquiry");

router.use(protect, requireRole("lister"));

router.get("/", async (req, res) => {
  const inquiries = await Inquiry.find({
    lister: req.user._id
  })
    .populate("listing", "title")
    .sort({ createdAt: -1 });

  res.json(inquiries);
});

module.exports = router;