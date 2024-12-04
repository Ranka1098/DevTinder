const jwt = require("jsonwebtoken");
const User = require("../model/user");

const userAuth = async (req, res, next) => {
  // read the cookies
  const cookies = req.cookies;

  //extract token form the cookie
  const { token } = cookies;

  if (!token) {
    return res.status(401).send("Token is missing");
  }

  // validate token by jwt.verify method
  const isValidToken = await jwt.verify(token, "DevTinder$123");

  // jwt.verify method return id of user
  const { _id } = isValidToken;

  // get userbyid
  const user = await User.findById(_id);

  // validate user
  if (!user) {
    res.send("user is not found");
  }
  req.user = user;
  next();
};

module.exports = userAuth;
