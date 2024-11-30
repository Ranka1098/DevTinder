const mongoose = require("mongoose");
const validator = require("validator");

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

module.exports = mongoose.model("userinfo", userSchema);
