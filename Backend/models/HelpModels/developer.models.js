// Developer Data Models Where we are store developer all details what he did on the software

import mongoose from "mongoose";

const developerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    mobile_no: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    avatar: {
      type: String,
      required: true,
    },
    verifyCode: {
      // Is that's why we identify register a developer is right people or not .
      type: Number,
      required: true,
      trim: true,
      unique: true,
    },
    designation: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    refresh_token: {
      type: String,
      default: "",
    },
    role: {
      // Validate there id by token that's why they use ..
      type: String,
      default: "developer",
    },
    verifyOtp: {
      // For Forgot a Password or other mad things..
      type: String,
      default: null,
    },
    OtpExpiry: {
      type: Date,
      default: null,
    },
    verifyId: {
      // When they are logout and want to login quickly they just put that unique number they set and then login ...
      type: Number,
      default: null,
    },
    token: {
      // JWT token for Authentication and Authorizations
      type: Number,
      default: null,
    },
    tokenExpiry: {
      type: Date,
      default: null,
    },
    isVerify: {
      // Checking when they are register email is genuine or not ..
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const developerModels = mongoose.model("developer", developerSchema);

export { developerModels };