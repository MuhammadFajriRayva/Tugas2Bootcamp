const express = require("express");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const app = express();
const tokenRoutes = require("./routes/tokenRoutes");

app.use(express.json());
app.use("/profile", profileRoutes);
app.use("/books", bookRoutes);
app.use("/auth", authRoutes);
app.use("/token",tokenRoutes);

module.exports = app;