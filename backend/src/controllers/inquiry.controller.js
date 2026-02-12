const Inquiry = require("../models/Inquiry");
const Listing = require("../models/Listing");
const resend = require("../config/resend");

exports.createInquiry = async (req, res) => {
  const { listingId, name, email, message } = req.body;

  const listing = await Listing.findOne({
    _id: listingId,
    status: "approved"
  }).populate("owner");

  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }

  // Save inquiry
  const inquiry = await Inquiry.create({
    listing: listing._id,
    lister: listing.owner._id,
    name,
    email,
    message
  });

  // Email lister
  await resend.emails.send({
    from: process.env.FROM_EMAIL,
    to: listing.owner.email,
    subject: `New inquiry for "${listing.title}"`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  });

  res.status(201).json({ message: "Inquiry sent successfully" });
};
