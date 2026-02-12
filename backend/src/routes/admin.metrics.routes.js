const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const { requireRole } = require("../middleware/role.middleware");
const Listing = require("../models/Listing");
const Inquiry = require("../models/Inquiry");

router.use(protect, requireRole("admin"));

router.get("/", async (req, res) => {
  const totalListings = await Listing.countDocuments();
  const approvedListings = await Listing.countDocuments({ status: "approved" });
  const rejectedListings = await Listing.countDocuments({ status: "rejected" });
  const boostedListings = await Listing.countDocuments({ isBoosted: true });
  const inquiries = await Inquiry.countDocuments();

  res.json({
    totalListings,
    approvedListings,
    rejectedListings,
    boostedListings,
    inquiries
  });
});

module.exports = router;
