const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const { requireRole } = require("../middleware/role.middleware");

const User = require("../models/User");
const Listing = require("../models/Listing");
const Inquiry = require("../models/Inquiry");

router.use(protect, requireRole("admin"));

router.get("/", async (req, res) => {
  const users = await User.find().select("-password");

  const enrichedUsers = await Promise.all(
    users.map(async (user) => {
      const listingsCount = await Listing.countDocuments({
        owner: user._id
      });

      const inquiriesReceived = await Inquiry.countDocuments({
        lister: user._id
      });

      return {
        ...user.toObject(),
        listingsCount,
        inquiriesReceived
      };
    })
  );

 

  res.json(enrichedUsers);
});

module.exports = router;