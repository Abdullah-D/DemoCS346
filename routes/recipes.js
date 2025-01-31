const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const Recipe = require("../models/recipe");


router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    console.error("Error in GET /recipes:", error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});


router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, steps, image } = req.body;
    const recipe = new Recipe({ name, steps, image });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    console.error("Error in POST /recipes:", error);
    res.status(500).json({ error: "Failed to add recipe" });
  }
});


router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).send("Deleted");
  } catch (error) {
    console.error("Error in DELETE /recipes/:id:", error);
    res.status(500).json({ error: "Failed to delete recipe" });
  }
});

module.exports = router;