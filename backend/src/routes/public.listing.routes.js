const router = require("express").Router();
const Listing = require("../models/Listing");

// Public browse only approved + active
router.get("/", async (req, res) => {
  const listings = await Listing.find({
    status: "approved",
    expiresAt: { $gt: new Date() }
  }).populate("owner", "name");

  res.json(listings);
});

// Public view single listing
router.get("/:id", async (req, res) => {
  const listing = await Listing.findOne({
    _id: req.params.id,
    status: "approved",
    expiresAt: { $gt: new Date() }
  }).populate("owner", "name email");

  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }

  res.json(listing);
});

module.exports = router;
