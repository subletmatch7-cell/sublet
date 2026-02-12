const router = require("express").Router();
const {
  createListing,
  getListings,
  getListing,
  updateListing,
  deleteListing
} = require("../controllers/listing.controller");
const { protect } = require("../middleware/auth.middleware");

router.get("/", getListings);
router.get("/:id", getListing);

router.post("/", protect, createListing);
router.put("/:id", protect, updateListing);
router.delete("/:id", protect, deleteListing);

module.exports = router;
