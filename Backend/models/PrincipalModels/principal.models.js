// Here are Principal Model all details they we are store in our db Principal not do anthings they just see analytics and
// our college teacher, Students and hod perfromance

import mongoose from "mongoose";

const PrincipalSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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
      // Is that's why we identify register a Principal is right people or not .
      type: Number,
      required: true,
      trim: true,
      unique: true,
      enum: {
        values: [282005],
        message: "Invalid Principal Registration key.",
      },
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Others"],
        message: "Gender must be either male, female, or other",
      },
      required: true,
    },
    mobile_no: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    verifyId: {
      // Is that's why we identify register a developer is right people or not .
      type: Number,
      default: "",
    },
    last_login: {
      type: Date,
      default: "",
    },
    refresh_token: {
      type: String,
      default: "",
    },
    role: {
      // Validate there id by token that's why they use ..
      type: String,
      default: "principal",
    },
    verifyOtp: {
      // For Forgot a Password or other mad things..
      type: String,
      default: "",
    },
    OtpExpiry: {
      type: Date,
      default: "",
    },
    isVerify: {
      // Checking when they are register email is genuine or not ..
      type: Boolean,
      default: false,
    },
    token: {
      type: Number,
      default: null,
    },
    tokenExpiry: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const PrincipalModels = mongoose.model("principal", PrincipalSchema);

export { PrincipalModels };
