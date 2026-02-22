// const router = require("express").Router();
// const { protect } = require("../middleware/auth.middleware");
// const { requireRole } = require("../middleware/role.middleware");

// const Listing = require("../models/Listing");
// const Inquiry = require("../models/Inquiry");
// const Lead = require("../models/Lead");

// router.use(protect, requireRole("admin"));

// router.get("/", async (req, res) => {
//   const now = new Date();
//   const weekAgo = new Date();
//   weekAgo.setDate(now.getDate() - 7);

//   const totalListings = await Listing.countDocuments();
//   const approvedListings = await Listing.countDocuments({ status: "approved" });
//   const pendingListings = await Listing.countDocuments({ status: "pending" });
//   const rejectedListings = await Listing.countDocuments({ status: "rejected" });

//   const expiredListings = await Listing.countDocuments({
//     expiresAt: { $lte: now }
//   });

//   const newListingsThisWeek = await Listing.countDocuments({
//     createdAt: { $gte: weekAgo }
//   });

//   const boostedListings = await Listing.countDocuments({ isBoosted: true });

//   const totalInquiries = await Inquiry.countDocuments();
//   const inquiriesThisWeek = await Inquiry.countDocuments({
//     createdAt: { $gte: weekAgo }
//   });

//   const totalLeads = await Lead.countDocuments();

//   const inquiriesPerListing =
//     totalListings > 0
//       ? (totalInquiries / totalListings).toFixed(2)
//       : 0;

//   const boostConversionRate =
//     totalListings > 0
//       ? ((boostedListings / totalListings) * 100).toFixed(1)
//       : 0;

//   res.json({
//     supply: {
//       totalListings,
//       approvedListings,
//       pendingListings,
//       rejectedListings,
//       expiredListings,
//       newListingsThisWeek
//     },
//     demand: {
//       totalInquiries,
//       inquiriesThisWeek,
//       inquiriesPerListing
//     },
//     monetization: {
//       boostedListings,
//       boostConversionRate
//     },
//     leads: {
//       totalLeads
//     }
//   });
// });

// module.exports = router;