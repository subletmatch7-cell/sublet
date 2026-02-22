const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const { requireRole } = require("../middleware/role.middleware");
const Lead = require("../models/Lead");

router.use(protect, requireRole("admin"));

// Get all leads
router.get("/", async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 });
  res.json(leads);
});

// Delete a lead (spam cleanup)
router.delete("/:id", async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ message: "Lead deleted" });
});

module.exports = router;