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

// middleware authrizaton example
app.use("/admin", (req, res, next) => {
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send("unauthorized request");
  } else {
    next();
  }
});
app.get("/admin/getData", (req, res) => {
  res.send("user data is send");
});
app.delete("/admin/deleteUser", (req, res) => {
  res.send("user deleted sucessfully");
});

// error handling

app.get("/getUser", (req, res) => {
  try {
    res.send("user data send sucessfully");
  } catch (err) {
    res.send("error" + err);
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(401).send("something went wrong");
  }
});
