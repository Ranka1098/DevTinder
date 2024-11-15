const express = require("express");

const app = express();
// --------------------------------------------------

// all http methods and user data send

app.get("/user", (req, res) => {
  console.log("get method");
  res.send("get methos is called");
});

app.post("/user", (req, res) => {
  console.log("post method called");
  res.send("post method is called");
});

app.delete("/user", (req, res) => {
  console.log("delete method is called");
  res.send("delete method is called");
});

app.post("/user", (req, res) => {
  console.log("post method is called");
  res.send("post method is called");
});

app.patch("/user", (req, res) => {
  console.log("patch method is called");
  res.send("patch method is called");
});

// advance routing concept

// 1. ? optional
app.get("/ab?c", (req, res) => {
  res.send("send data to the server");
});
// you calls this route
// http//:localhost:3000/ac and also http//:localhost:3000/abc
// because "b" letter after give ? mark.

// 2. + add pattern
app.get("/ab+c", (req, res) => {
  res.send("send abbbc data to the server");
});
// you calls this route
// http//:localhost:3000/abbc and also http//:localhost:3000/abbbbbc
// because + sign checks match pattern start with b and ends with c

// 3.* staring text and ends text match and  between gives any text.
app.get("/ab*c", (req, res) => {
  res.send("send gcsddsd data to the server");
});

// you calls this route
// http//:localhost:3000/abbgdsdsdc and also http//:localhost:3000/abgjvcvccc
// because * sign checks match pattern start with ab and ends with c and any text given between

// 4.regex -> not route written inside " "
// 1. /a/ -> if in the path a letter is there it will be worked

app.get(/a/, (req, res) => {
  res.send(" send cat data to server ");
});
//localhost:3000/cat it will worked because letter c and letter d betwwen letter a is present
// 2./.*fly$/ -> start with any letter and end with fly text it works

app.get(/.*fly$/, (req, res) => {
  res.send("regex send to server");
});
//localhost:3000/butterfly it will worked because this route and with fly text

// 5.query => this query gives the information of url parameter
app.get("/pqr", (req, res) => {
  console.log("userid is:", req.query);
  res.send("data sucessfully passed");
});

// 6.how to make route dynamic
//localhost:3000/user/101
// how to get user 101 value

app.get("/xyz/:userId", (req, res) => {
  console.log(req.params);
  res.send(" send data ");
});
// -> : colon meance dynamic routing
// ->req.params -> params will give you value
// o/p=> userid 101

// you can pass multiple dynamic value.
app.get("/user/:userid/:name/:password", (req, res) => {
  console.log("userid ,name ,password", req.params);
  res.send("data is send");
});
// url => //localhost:3000/user/101/ashok/testing
// o/p=> userid=>101 , name=>ashok ,password=>testing

// ----------------------------------------------------

app.listen(3000, () => {
  console.log("server is started");
});
