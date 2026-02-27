const router = require("express").Router();
const {
  createListing,
  getListings,
  getPublicListing,
  getMyListings,
  updateListing,
  deleteListing
} = require("../controllers/listing.controller");

const { protect } = require("../middleware/auth");

// Public
router.get("/", getListings);
router.get("/:id", getPublicListing);

// Protected
router.post("/", protect, createListing);
router.get("/me/mine", protect, getMyListings);
router.put("/:id", protect, updateListing);
router.delete("/:id", protect, deleteListing);

module.exports = router;