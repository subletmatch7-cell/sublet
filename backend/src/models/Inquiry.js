const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true
    },

    lister: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inquiry", inquirySchema);
