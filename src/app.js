const express = require("express");
require("./config/databse");

const app = express();

app.listen(3000, () => {
  console.log("server listening on port no 3000");
});
