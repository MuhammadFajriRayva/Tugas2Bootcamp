const express = require("express");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

// Middleware JSON
app.use(express.json());

// Routes
app.use("/books", bookRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found"
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

module.exports = app;