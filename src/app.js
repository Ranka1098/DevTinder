const express = require("express");
const connectDB = require("./config/databse");
const User = require("./model/user");
const validateSignUpData = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

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

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);

    // encrypt the password
    const { firstName, lastName, emailId, password } = req.body;
    // bcrypt return a promise
    const passwordHash = await bcrypt.hash(password, 10);

    console.log("encrypted password is" + passwordHash);

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ emailId: req.body.emailId });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    // creating new user instance
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    // Save the new user
    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("Error saving user: " + err.message);
  }
});

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
app.post("/loginUser", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      return res.status(400).send("Login failed: Email not registered.");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      // create JWT token

      // then token wrap inside cookie and send back to user
      const cookies = res.cookie("token", "ruhwruhvnngrurivnkvsdpiwfwe8");
      console.log(cookies);
      res.send("Login successful");
    } else {
      return res.status(400).send("Login failed: Incorrect password.");
    }
  } catch (err) {
    res.status(400).send("User not updated: " + err.message);
  }
});

// user profile api call
app.get("/userProfile", async (req, res) => {
  const cookies = req.cookies; // Access cookies from the request
  console.log(cookies);

  const { token } = cookies;
  if (token) {
    res.send("token is valid");
  } else {
    res.send("plss login");
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
