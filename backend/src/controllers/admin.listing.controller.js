const Listing = require("../models/Listing");

/**
 * Get all listings with filters
 */
exports.getAllListings = async (req, res) => {
  const { status, search } = req.query;

  const query = {};

  if (status && status !== "all") {
    query.status = status;
  }

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  const listings = await Listing.find(query)
    .populate("owner", "name email")
    .sort({ createdAt: -1 });

  res.json(listings);
};

/**
 * Approve listing
 */
exports.approveListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }

  listing.status = "approved";
  listing.adminNote = null;

  await listing.save();

  res.json({ message: "Listing approved", listing });
};

/**
 * Request more info (reject with note)
 */
exports.requestInfo = async (req, res) => {
  const { adminNote } = req.body;

  if (!adminNote) {
    return res.status(400).json({ message: "Admin note required" });
  }

  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }

  listing.status = "rejected";
  listing.adminNote = adminNote;

  await listing.save();

  res.json({ message: "Info requested", listing });
};

/**
 * Delete listing permanently
 */
exports.deleteListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }

  await listing.deleteOne();

  res.json({ message: "Listing deleted" });
};