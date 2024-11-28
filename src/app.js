const express = require("express");
const connectDB = require("./config/databse");
const User = require("./model/user");

const app = express();
// app.use() method activate all middleware
// app.use(()=>{})

// all incoming json data request from body convert into js object
app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user added successfully!");
  } catch (err) {
    res.status(400).send("error saving user" + err.message);
  }
});

// feed Api - GET/feed -find user using emailID from the datbase database
app.get("/feed", async (req, res) => {
  try {
    // const userEmail = req.body.emailId;

    const user = await User.find({ emailId: req.body.emailId });
    res.send(user);
  } catch (err) {
    res.status(400).send("user not found in database" + err);
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
