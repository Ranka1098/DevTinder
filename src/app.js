const express = require("express");
const connectDB = require("./config/databse");
const User = require("./model/user");

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userAuth = require("./middleware/userAuth");

const authRouter = require("./router/authRouter");

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

app.use("/", authRouter);

// feed Api - GET/feed -find user using emailID from the datbase database
app.get("/findUser", async (req, res) => {
  try {
    // const userEmail = req.body.emailId;

    const user = await User.find({ emailId: req.body.emailId });
    if (user.length === 0) {
      res.status(404).send("user not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("user not found in database" + err);
  }
});

// get all user from database
app.get("/alluser", async (req, res) => {
  try {
    const allUser = await User.find({});
    // emprty object returns all user
    res.send(allUser);
  } catch (err) {
    res.status(400).send("user not found" + err.message);
  }
});

// delete user from database
app.delete("/userDelete", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    res.send("user deleted" + user);
  } catch (err) {
    res.status(400).send("user delete" + err.message);
  }
});

// update user from database
app.patch("/userUpdate", async (req, res) => {
  const { userId, ...updateData } = req.body;

  try {
    const ALLOWED_UPDATE = ["photoUrl", "about", "gender", "skill"];

    const isUpdateAllowed = Object.keys(updateData).every((k) =>
      ALLOWED_UPDATE.includes(k)
    );

    if (!isUpdateAllowed) {
      return res.status(400).send("Update not allowed for these fields.");
    }

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: updateData,
      },
      { new: true, runValidators: true }
    );

    if (!updateUser) {
      return res.status(404).send("User not found.");
    }
    res.send("User data updated successfully.");
  } catch (err) {
    res.status(400).send("User not updated: " + err.message);
  }
});

// login api

// user profile api call
app.get("/userProfile", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user);
});

// sending connection request
app.get("/sendingconnection", userAuth, async (req, res) => {
  const user = req.user;
  console.log("connection of this user", user.firstName);
  console.log("connection establised");
  res.send("connection establised");
});

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
