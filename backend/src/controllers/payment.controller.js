const stripe = require("../config/stripe");
const Listing = require("../models/Listing");

exports.createCheckoutSession = async (req, res) => {
  const { listingId, type } = req.body;

  const listing = await Listing.findOne({
    _id: listingId,
    owner: req.user._id
  });

  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }

  let product;

  if (type === "extend") {
    product = {
      name: "Extend listing (14 days)",
      amount: 1500
    };
  } else if (type === "boost") {
    product = {
      name: "Boost listing",
      amount: 1000
    };
  } else {
    return res.status(400).json({ message: "Invalid payment type" });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: product.name },
          unit_amount: product.amount
        },
        quantity: 1
      }
    ],
    metadata: {
      listingId: listing._id.toString(),
      type
    },
    success_url: `${process.env.FRONTEND_URL}/lister/dashboard?success=true`,
    cancel_url: `${process.env.FRONTEND_URL}/lister/dashboard?cancel=true`
  });

  res.json({ url: session.url });
};
