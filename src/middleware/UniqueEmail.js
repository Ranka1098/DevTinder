const User = require("../model/user");

const uniqueEmail = async (req, res, next) => {
  try {
    const { emailId } = req.body;
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    next(); // Pass control to the next middleware or route handler
  } catch (err) {
    res.status(500).json({ error: "Server error while checking email" });
  }
};

module.exports = uniqueEmail;
