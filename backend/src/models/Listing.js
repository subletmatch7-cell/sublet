const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    city: { type: String, required: true },
    neighborhood: { type: String },
    price: { type: Number, required: true },
    availableFrom: { type: Date, required: true },
    availableTo: { type: Date },
    description: { type: String },
    phone: { type: String },
    images: [String],

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    adminNote: String,

    isBoosted: { type: Boolean, default: false },
    expiresAt: { type: Date, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Listing", listingSchema);
