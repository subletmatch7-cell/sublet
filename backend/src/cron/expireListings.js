const cron = require("node-cron");
const Listing = require("../models/Listing");

const expireListingsJob = () => {
  // Runs every hour
  cron.schedule("0 * * * *", async () => {
    try {
      const now = new Date();

      const expiredListings = await Listing.updateMany(
        {
          expiresAt: { $lte: now }
        },
        {
          $set: { isBoosted: false }
        }
      );

      console.log(
        `[CRON] Expired listings checked at ${now.toISOString()}`
      );
    } catch (error) {
      console.error("[CRON] Expiration error:", error);
    }
  });
};

module.exports = expireListingsJob;
