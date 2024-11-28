const express = require("express");
const connectDB = require("./config/databse");
const User = require("./model/user");

const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Ashok",
    lastName: "Ranka",
    emailId: "ashok@gmail.com",
    password: "Ashok@123",
  });

  await user.save();
  res.send("user added successfully");
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
