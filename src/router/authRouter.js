const express = require("express");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const validateSignUpData = require("../utils/validation");
const uniqueEmail = require("../middleware/UniqueEmail");

const authRouter = express.Router();

// ---------------------signup api--------------------------------
authRouter.post("/signup", uniqueEmail, async (req, res) => {
  try {
    validateSignUpData(req);

    // encrypt the password
    const { firstName, lastName, emailId, password } = req.body;
    // bcrypt return a promise
    const passwordHash = await bcrypt.hash(password, 10);

    console.log("encrypted password is" + passwordHash);

    // Check if the email already exists in the database
    // const existingUser = await User.findOne({ emailId: req.body.emailId });
    // if (existingUser) {
    //   throw new Error("Email already exists");
    // }

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
// ---------------------signup api--------------------------------
// ---------------------login api--------------------------------
authRouter.post("/loginUser", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      return res.status(400).send("Login failed: Email not registered.");
    }
    const isPasswordMatch = await user.validatePassword(password);
    // user has sent in validate function password
    if (isPasswordMatch) {
      // create JWT token
      const token = await user.getJWT();

      console.log("jwt token : ", token);
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);

      // then token wrap inside cookie and send back to user
      const cookies = res.cookie("token", token, {
        expires: expires,
      });
      res.send("Login successful");
    } else {
      return res.status(400).send("Login failed: Incorrect password.");
    }
  } catch (err) {
    res.status(400).send("User not updated: " + err.message);
  }
});
// ---------------------login api--------------------------------
// ---------------------logout api--------------------------------
authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("logout success fully");
});
// ---------------------logout api--------------------------------

module.exports = authRouter;
