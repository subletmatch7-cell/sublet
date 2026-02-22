const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const { requireRole } = require("../middleware/role.middleware");
const upload = require("../middleware/upload.middleware");
const Listing = require("../models/Listing");

router.use(protect, requireRole("lister"));

// Get own listings
router.get("/", async (req, res) => {
  const listings = await Listing.find({ owner: req.user._id });
  res.json(listings);
});

// Create listing WITH images
router.post(
  "/",
  upload.array("images", 5),
  async (req, res) => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 14);

    const imageUrls = req.files?.map((file) => file.path) || [];

    const listing = await Listing.create({
      ...req.body,
      images: imageUrls,
      owner: req.user._id,
      expiresAt
    });

    res.status(201).json(listing);
  }
);

// Update listing (optionally replace images)
router.put(
  "/:id",
  upload.array("images", 5),
  async (req, res) => {
    const listing = await Listing.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    Object.assign(listing, req.body);

    if (req.files?.length) {
      listing.images = req.files.map((file) => file.path);
    }

    // Reset status if resubmitted
    if (listing.status === "rejected") {
      listing.status = "pending";
      listing.adminNote = null;
    }

    await listing.save();
    res.json(listing);
  }
);

// Delete listing

router.delete("/:id", async (req, res) => {
  const listing = await Listing.findOneAndDelete({
    _id: req.params.id,
    owner: req.user._id
  });

  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }

  res.json({ message: "Listing deleted" });
});

module.exports = router;
