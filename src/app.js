const express = require("express");
const connectDB = require("./config/databse");
const User = require("./model/user");
const validateSignUpData = require("./utils/validation");

const app = express();
// app.use() method activate all middleware
// app.use(()=>{})

// all incoming json data request from body to convert into js object
app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    validateSignUpData(req);

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ emailId: req.body.emailId });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    // Save the new user
    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("Error saving user: " + err.message);
  }
});

// feed Api - GET/feed -find user using emailID from the datbase database
app.get("/feed", async (req, res) => {
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
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate({ _id: userId }, data);
    res.send("user update data sucessfully");
  } catch (err) {
    res.status(400).send("user not updated" + err.message);
  }
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
