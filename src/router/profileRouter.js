const express = require("express");
const userAuth = require("../middleware/userAuth");
const User = require("../model/user");

const profileRouter = express.Router();

// ------------------user get profile api call---------------
profileRouter.get("/userProfile", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user);
});
// ------------------user get profile api call---------------
// ------------------user profile update api call---------------
profileRouter.patch("/userUpdate", async (req, res) => {
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

// ------------------user profile update api call---------------

module.exports = profileRouter;
