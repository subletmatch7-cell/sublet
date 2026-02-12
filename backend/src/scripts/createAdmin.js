require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const hashedPassword = await bcrypt.hash("Admin123!", 10);

  await User.create({
    name: "Admin",
    email: "info@subletmatch.com",
    password: "Admin123!",  // plain text
    role: "admin"
  });
  

  console.log("Admin created with password: Admin123!");
  process.exit();
})();
