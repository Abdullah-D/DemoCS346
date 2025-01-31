const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  steps: { type: String, required: true },
  image: { type: String }, 
}, { timestamps: true });

module.exports = mongoose.model("Recipe", recipeSchema);