const Listing = require("../models/Listing");
const resend = require("../config/resend");

exports.requestMoreInfo = async (req, res) => {
  const { adminNote } = req.body;

  if (!adminNote) {
    return res.status(400).json({ message: "Admin note is required" });
  }

  const listing = await Listing.findById(req.params.id).populate("owner");

  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }

  // Update listing status
  listing.status = "rejected";
  listing.adminNote = adminNote;
  await listing.save();

  // Email lister
  await resend.emails.send({
    from: process.env.FROM_EMAIL,
    to: listing.owner.email,
    subject: "Action required: Update your SubletMatch listing",
    html: `
      <p>Hello ${listing.owner.name},</p>

      <p>Your listing <strong>${listing.title}</strong> needs additional information before it can be approved.</p>

      <p><strong>Admin note:</strong></p>
      <p>${adminNote}</p>

      <p>Please log in to your lister dashboard, update the listing, and resubmit it for review.</p>

      <p>— SubletMatch Team</p>
    `
  });

  res.json({
    message: "Request for more information sent to lister",
    listing
  });
};
