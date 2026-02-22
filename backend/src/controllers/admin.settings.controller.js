const User = require("../models/User");

/**
 * Update Admin Profile
 */
exports.updateProfile = async (req, res) => {
  const { name } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({
      message: "Name must be at least 2 characters"
    });
  }

  const admin = await User.findById(req.user._id);

  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  admin.name = name.trim();
  await admin.save();

  res.json({
    message: "Profile updated successfully",
    user: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    }
  });
};

/**
 * Update Admin Password
 */
exports.updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      message: "All password fields are required"
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters"
    });
  }

  const admin = await User.findById(req.user._id);

  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  const isMatch = await admin.comparePassword(currentPassword);

  if (!isMatch) {
    return res.status(400).json({
      message: "Current password is incorrect"
    });
  }

  admin.password = newPassword; // will hash via pre-save hook
  await admin.save();

  res.json({ message: "Password updated successfully" });
};