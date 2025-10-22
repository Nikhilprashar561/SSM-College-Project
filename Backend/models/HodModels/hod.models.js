// Here We are store all about register Hod Details track there record how they are use software
// and all about hod they belong to a particular department

import mongoose from "mongoose";

const HodSchema = new mongoose.Schema(
  {
    department: {
      // Hod Department
      type: String,
      required: true,
      unique: true,
      enum: {
        values: [
          "Department of Computer Science",
          "Department of Commerce",
          "Department of Arts",
        ],
        message: "Invalid department. Not allowed.",
      },
    },
    hod: {
      type: String,
      default: "",
      trim: true,
    },
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
      index: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    verifyCode: {
      // Is that's why we identify register a Hod is right people or not .
      type: Number,
      required: true,
      trim: true,
      unique: true,
    },
    refresh_token: {
      type: String,
      default: "",
    },
    mobile_no: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    qualifications: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Others"],
        message: "Gender must be either male, female, or other",
      },
      required: true,
    },
    role: {
      // Validate there id by token that's why they use ..
      type: String,
      default: "hod",
    },
    verifyID: {
      // For Login Purpose When user don't Put there email and Password
      type: Number,
      default: "",
    },
    last_login: {
      type: Date,
      default: "",
    },
    points: {
      // This Property is used because is a feature provide to a hod they collect some points and to share students some pdfs and earn points and that whit the help of points we give some Money
      type: Number,
      default: 0,
      trim: true,
    },
    assignClasses: [
      // Which means how much classes assign to that teacher
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "timeTabel",
      },
    ],
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

const HodModels = mongoose.model("hod", HodSchema);

export { HodModels };

// Computer Department
// Commerce Department
// Arts & Humanities Department
