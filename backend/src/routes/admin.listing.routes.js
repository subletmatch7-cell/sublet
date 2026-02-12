const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const { requireRole } = require("../middleware/role.middleware");
const Listing = require("../models/Listing");
const { requestMoreInfo } = require("../controllers/admin.controller");




router.use(protect, requireRole("admin"));

// View all listings
router.get("/", async (req, res) => {
  const listings = await Listing.find().populate("owner", "name email");
  res.json(listings);
});

// Approve
router.put("/:id/approve", async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  listing.status = "approved";
  listing.adminNote = null;
  await listing.save();
  res.json(listing);
});

// Reject / request info
router.put("/:id/reject", async (req, res) => {
  const { adminNote } = req.body;

  const listing = await Listing.findById(req.params.id);
  listing.status = "rejected";
  listing.adminNote = adminNote;
  await listing.save();
  res.json(listing);
});

// Request More info
router.put("/:id/request-info", requestMoreInfo);

// Admin override update
router.put("/:id", async (req, res) => {
  const listing = await Listing.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(listing);
});

// Admin delete
router.delete("/:id", async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  res.json({ message: "Listing removed" });
});

module.exports = router;
