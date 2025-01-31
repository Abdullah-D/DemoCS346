require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");


const authRoutes = require("./routes/auth");
const recipeRoutes = require("./routes/recipes");

const app = express();


app.use(express.json({ limit: "10mb" }));
app.use(cors());


mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/recipes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));


app.use("/auth", authRoutes);
app.use("/recipes", recipeRoutes);


app.use(express.static(path.join(__dirname, "public")));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});