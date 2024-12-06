const express = require("express");
const connectDB = require("./config/databse");
const User = require("./model/user");

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userAuth = require("./middleware/userAuth");

const authRouter = require("./router/authRouter");

const profileRouter = require("./router/profileRouter");

const requestRouter = require("./router/requestRouter");

const userRouter = require("./router/userRouter");

// Jab aap express() ko call karte hain, toh yeh ek Express application instance return karta hai.
// Is application instance ka use karke aap routes, middleware, server configuration, aur response handling setup karte hain.
const app = express();

// app ka Role: app ek central object hai jo:
// HTTP requests ko handle karta hai.
// Routes define karta hai (e.g., GET, POST requests ke liye).
// Middleware ko integrate karta hai (e.g., body-parser, cookie-parser).
// Server ko configure karta hai aur listen karata hai.

// Middleware to parse cookies
app.use(cookieParser());

// app.use() method activate all middleware
// app.use(()=>{})

// all incoming json data request from body to convert into js object
app.use(express.json());

// -------------------------routers----------------------------

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
// -------------------------routers----------------------------

// --------------------database connection------------------------
connectDB()
  .then(() => {
    console.log("connect to database sucessfully ");
    app.listen(3000, () => {
      console.log("server listening on port no 3000");
    });
  })
  .catch((err) => {
    console.log("not connect to database", err);
  });
