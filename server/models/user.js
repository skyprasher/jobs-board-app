const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Fix: Check if the model already exists
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
