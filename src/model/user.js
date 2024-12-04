const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
      maxLength: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email format");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("password should be strong");
        }
      },
    },
    age: {
      type: Number,
      min: 14,
      trim: true,
    },
    about: {
      type: String,
    },
    skill: {
      type: [String],
    },
    photoUrl: {
      type: String,
      default: "https://www.shutterstock.com/search/user-profile",
    },
    gender: {
      type: String,
      trim: true,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("gender not valid");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

// schema handler methods
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DevTinder$123", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordMatch = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  // passwordInputByUser is coming from request which user is sent
  // passwodHash is actual user password hashed
  return isPasswordMatch;
};
module.exports = mongoose.model("userinfo", userSchema);
