require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const result = await User.deleteOne({
      email: "admin@subletmatch.com"
    });

    if (result.deletedCount === 0) {
      console.log("No admin found with that email.");
    } else {
      console.log("Admin deleted successfully.");
    }

    process.exit();
  } catch (err) {
    console.error("Error deleting admin:", err);
    process.exit(1);
  }
})();
