require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const AppError = require("./errors/appError");
const usersRoutes = require("./routes/usersRoutes");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());

// Use users routes
app.use("/api/users", usersRoutes);

// Handle non-existing endpoints
app.use((req, res) => {
  throw new AppError("Resource not found", 404);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Server error";
  res.status(statusCode).json({ message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

