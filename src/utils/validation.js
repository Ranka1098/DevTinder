const validator = require("validator");
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("name is invalid");
  } else if (firstName.length < 4 || firstName.length > 20) {
    throw new Error("name should be 4 to 20 character");
  } else if (lastName.length < 4 || lastName.length > 20) {
    throw new Error("name should be 4 to 20 character");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("password is not valid");
  }
};

module.exports = validateSignUpData;
