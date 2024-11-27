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

// all http call form server

app.get("/user", (req, res) => {
  res.send("get call from 3000");
});

app.post("/user", (req, res) => {
  res.send("post call from 3000");
});

app.patch("/user", (req, res) => {
  res.send(" patch call frm 3000");
});

app.put("/user", (req, res) => {
  res.send(" put call frm 3000");
});

app.delete("/user", (req, res) => {
  res.send(" delete call frm 3000");
});

// advance routing

// 1.optional routing using question mark (?)
// get call route work /abc ya /ac
app.get("/ab?c", (req, res) => {
  res.send("advance rounting call ab?c");
});

//2.match pattern using plus mark (+)
//get call match pattern ending with bc
//call /abc ya /abbbc ya /abbbbc
app.get("/ab+c", (req, res) => {
  res.send("advance rounting call ab+c");
});

//3.between any text using star mark (*)
//get call it match between pattern bc
// call /abbbcc ya abbc
app.get("/ab*c", (req, res) => {
  res.send("advance rounting call ab*c");
});

//4.reggex
// => /a/ if in the path letter a is there is worked
app.get(/a/, (req, res) => {
  res.send("advance rounting call regex path in a");
});
// => /.*fly$/ start with any letter ends with fly letter ex./butterfly
app.get(/.*fly$/, (req, res) => {
  res.send("advance rounting call regex end with fly letter");
});

// how  do you handle the incoming call using the route handler
app.use("/", (req, res) => {
  res.send("hello from the server");
});
