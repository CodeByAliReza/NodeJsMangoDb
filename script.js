const express = require("express");
const app = express();
const mongoose = require("mongoose");
const AppError = require("./src/utils/AppError");
const errorMiddleware = require("./middleware/errorMiddleware");
const dotenv = require("dotenv");

dotenv.config();

app.use(express.json());

console.log(app.get("env"));

const baseUrl = "/api/v1";

// 2. MIDDLEWARE (Chowkidar / Security Guard)

// Har request sabse pehle iske paas aayegi
app.use(function(req, res, next) {
  console.log("Middleware is running side by side");
  next(); // Next nahi likhenge toh request yahin atak jayegi!
});

// 3. HOME ROUTE
app.get("/", function(req, res) {
  res.send("Hello World");
});

// Routes
app.use(`${baseUrl}`, require('./src/routes'));

// 404 handler
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this Server`, 404));
});

// Global error middleware
app.use(errorMiddleware);





const rawConn = process.env.MANGO_DB_CONNECTION;
if (!rawConn) {
    console.error("MANGO_DB_CONNECTION is not set in .env");
    process.exit(1);
}
const DB = rawConn.replace('<db_password>', process.env.MANGO_DB_PASSWORD);
mongoose.connect(DB).then(() => {
    console.log("MongoDB connected successfully");
}).catch((error) => {
    console.log(error);
});

// 6. SERVER START
const port = process.env.PORT || 3002;
app.listen(port, function() {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;