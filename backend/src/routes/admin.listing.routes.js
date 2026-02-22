const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const { requireRole } = require("../middleware/role.middleware");

const {
  getAllListings,
  approveListing,
  requestInfo,
  deleteListing
} = require("../controllers/admin.listing.controller");

router.use(protect, requireRole("admin"));

router.get("/", getAllListings);
router.put("/:id/approve", approveListing);
router.put("/:id/request-info", requestInfo);
router.delete("/:id", deleteListing);

module.exports = router;