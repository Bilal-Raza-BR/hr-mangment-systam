const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true, // Hashed password
  },
  role: {
    type: String,
    default: "owner",
  },
  phone: {
    type: String,
  },
  profilePic: {
    type: String, // Optional Cloudinary URL
  },
  lastLogin: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Owner", ownerSchema);
