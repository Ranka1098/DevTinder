// create the server
const express = require("express");

// creating new web server using express
const app = express();

//  listen the incoming call this server create port number
app.listen(3000);

// server successfully listening call on port number 3000
app.listen(500, () => {
  console.log("server listen incoming call on port number 3000");
});

// different request handle
app.use("/test", (req, res) => {
  res.send("test call");
});

app.use("/hello", (req, res) => {
  res.send("hello call");
});

// how  do you handle the incoming call using the route handler
app.use("/", (req, res) => {
  res.send("hello from the server");
});
