const express = require("express");
const User = require("../model/user");

const userRouter = express.Router();

// -----------find user---------------------------------------
userRouter.get("/findUser", async (req, res) => {
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
// -----------find user------------------------------------------
// -----------get all user------------------------------------------
userRouter.get("/alluser", async (req, res) => {
  try {
    const allUser = await User.find({});
    // emprty object returns all user
    res.send(allUser);
  } catch (err) {
    res.status(400).send("user not found" + err.message);
  }
});
// -----------get all user------------------------------------------
// -----------Delete user------------------------------------------
userRouter.delete("/userDelete", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    res.send("user deleted" + user);
  } catch (err) {
    res.status(400).send("user delete" + err.message);
  }
});
// -----------Delete user------------------------------------------

module.exports = userRouter;
