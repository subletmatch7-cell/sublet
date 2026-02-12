const User = require("../models/User");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password, role });

  res.status(201).json({
    user: { id: user._id, name: user.name, role: user.role },
    token: generateToken(user._id)
  });
};



exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    user: { id: user._id, name: user.name, role: user.role },
    token: generateToken(user._id)
  });
};
