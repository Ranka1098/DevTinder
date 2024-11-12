const express = require("express");

const app = express();
app.use("/test", (req, res) => {
  res.send("this is test route");
});

app.use("/hello", (req, res) => {
  res.send("this is hello server");
});

app.use((req, res) => {
  res.send("this is first program");
});

app.listen(3000, () => {
  console.log("server is started");
});
