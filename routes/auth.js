const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();


router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;


    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }


    const passwordHash = await bcrypt.hash(password, 10);


    const newUser = new User({
      username,
      passwordHash
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in /auth/register:", error);
    res.status(500).json({ error: "Registration failed", details: error });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;


    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }


    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }


    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET || "secretKey",
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error in /auth/login:", error);
    res.status(500).json({ error: "Login failed", details: error });
  }
});

module.exports = router;