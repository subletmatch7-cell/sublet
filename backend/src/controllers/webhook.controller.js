const stripe = require("../config/stripe");
const Listing = require("../models/Listing");

exports.stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { listingId, type } = session.metadata;

    const listing = await Listing.findById(listingId);

    if (listing) {
      if (type === "extend") {
        const newExpiry = new Date(
          Math.max(new Date(), listing.expiresAt)
        );
        newExpiry.setDate(newExpiry.getDate() + 14);
        listing.expiresAt = newExpiry;
      }

      if (type === "boost") {
        listing.isBoosted = true;
      }

      await listing.save();
    }
  }

  res.json({ received: true });
};
