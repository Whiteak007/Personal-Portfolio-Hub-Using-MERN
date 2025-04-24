const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
// Load environment variables
dotenv.config();

// Create express app
const app = express();

// Middleware
app.use(express.json()); // Replace body-parser with built-in express.json()
app.use(
  cors({
    origin: "http://localhost:3000", // Explicitly allow your React app
    credentials: true,
  })
);

// Accessing static file for deployment
app.use(express.static(path.join(__dirname, "./portfolio/build")));

// Routes
app.use("/api/v1/portfolio", require("./routes/portfolioRoute"));

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Portfolio Backend is running");
});

// Getting index.html file for deployment
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./portfolio/build/index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
