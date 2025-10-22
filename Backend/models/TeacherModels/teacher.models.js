// Here We are store all about a teacher how they are use and work on a software and add other details they need when they are create.

import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema(
  {
    department: {
      // Teacher department from which department to they belong ..
      type: String,
      required: true,
      enum: {
        values: [
          "Department of Computer Science",
          "Department of Commerce",
          "Department of Arts",
        ],
        message: "Invalid department. Not allowed.",
      },
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
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    mobile_no: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    designation: {
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
    last_login: {
      type: Date,
      default: "",
    },
    verifyID: {
      // For Login Purpose When user don't Put there email and Password
      type: Number,
      default: "",
    },
    assignClasses: [
      // Here Store time table id to identify which class to they and how they lecture have all about time table.
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "timeTabel",
      },
    ],
    refresh_token: {
      type: String,
      default: "",
    },
    role: {
      // Validate there id by token that's why they use ..
      type: String,
      default: "teacher",
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
    points: {
      // This Property is used because is a feature provide to a hod they collect some points and to share students some pdfs and earn points and that whit the help of points we give some Money
      type: Number,
      default: 0,
      trim: true,
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

const TeacherModels = mongoose.model("teacher", TeacherSchema);

export { TeacherModels };
