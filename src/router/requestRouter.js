const express = require("express");
const userAuth = require("../middleware/userAuth");
const { model } = require("mongoose");

const requestRouter = express.Router();
// ------------------sending connection request-----------------------
requestRouter.get("/sendingconnection", userAuth, async (req, res) => {
  const user = req.user;
  console.log("connection of this user", user.firstName);
  console.log("connection establised");
  res.send("connection establised");
});
// ------------------sending connection request-----------------------

module.exports = requestRouter;
