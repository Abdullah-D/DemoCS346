// Import Mongoose for MongoDB object modeling
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // To uniquely identify each user, provide a unique username
  passwordHash: { type: String, required: true }, // Hashed password for security
}, { timestamps: true }); // Automatic creation of createdAt and updatedAt timestamps

// Export the User model based on the schema
module.exports = mongoose.model("User", userSchema);
