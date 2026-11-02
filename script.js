const express = require("express");
const app = express();
const mongoose = require("mongoose");
const HttpStatus = require("./utils/httpStatus");
const taskController = require("./controllers/taskControllers");
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

// 4. GET ALL USERS ROUTE (getUserByParams filters by query params, then falls back to getAllTask)
app.get(`${baseUrl}/users`, [taskController.getUserByParams, taskController.getAllTask]);
app.get(`${baseUrl}/users/:id`,taskController.getUserById );
app.post(`${baseUrl}/PostUser`, taskController.postUser);
app.patch(`${baseUrl}/PatchUsers/:id`, taskController.patchUser);
app.delete(`${baseUrl}/DeleteUsers/:id`, taskController.deleteUser);
app.put(`${baseUrl}/PutUsers/:id`, taskController.putUser);

// catch-all route for 404
app.use((req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this Server`);
  err.statusCode = HttpStatus.NOT_FOUND;
  err.status = "fail";
  next(err);
});

// error handler middleware
app.use((err,req,res,next)=>{
  err.statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status : err.status,
    message : err.message
  })
})





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