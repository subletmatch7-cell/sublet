const Listing = require("../models/Listing");

// CREATE
exports.createListing = async (req, res) => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 14); // 14-day free period

  const listing = await Listing.create({
    ...req.body,
    owner: req.user._id,
    expiresAt
  });

  res.status(201).json(listing);
};

// READ (PUBLIC)
exports.getListings = async (req, res) => {
  const { city, minPrice, maxPrice } = req.query;

  const query = { expiresAt: { $gt: new Date() } };
  if (city) query.city = city;
  if (minPrice || maxPrice)
    query.price = {
      ...(minPrice && { $gte: minPrice }),
      ...(maxPrice && { $lte: maxPrice })
    };

  const listings = await Listing.find(query)
    .sort({ isBoosted: -1, createdAt: -1 })
    .populate("owner", "name");

  res.json(listings);
};

// READ ONE
exports.getListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate(
    "owner",
    "name email"
  );
  if (!listing) return res.status(404).json({ message: "Not found" });
  res.json(listing);
};

// UPDATE (OWNER ONLY)
exports.updateListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(404).json({ message: "Not found" });
  if (!listing.owner.equals(req.user._id))
    return res.status(403).json({ message: "Forbidden" });

  Object.assign(listing, req.body);
  await listing.save();
  res.json(listing);
};

// DELETE (OWNER ONLY)
exports.deleteListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(404).json({ message: "Not found" });
  if (!listing.owner.equals(req.user._id))
    return res.status(403).json({ message: "Forbidden" });

  await listing.deleteOne();
  res.json({ message: "Deleted" });
};
