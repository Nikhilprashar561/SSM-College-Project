// In this Student model we are store all about students details and all there activity how they efficiently use a software and what they do...

import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    className: {
      type: String,
      required: true,
      trim: true,
    },
    roll_no: {
      type: Number,
      required: true,
      trim: true,
    },
    father_name: {
      type: String,
      required: true,
      trim: true,
    },
    mother_name: {
      type: String,
      default: "",
      trim: true,
    },
    mobile_no: {
      type: Number,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Others"],
        message: "Gender must be either male, female, or other",
      },
      required: true,
    },
    dateOfBirth: {
      type: Date,
      default: "",
      trim: true,
      min: "1999-01-01",
      max: "2010-12-31",
    },
    refresh_token: {
      type: String,
      default: "",
    },
    points: {
      // This Property is used because is a feature provide to a Student they collect some points and to share students some pdfs and
      // earn points and that with the help of points we give some Money . It's is also work in when a one student got a maximum number in
      // there paper and result like mst and ut and for other tasks
      type: Number,
      default: 0,
      trim: true,
    },
    last_login: {
      type: Date,
      default: "",
    },
    payment: {
      //  Meant if a they are a normal student and buy a some subjects according there class subject and some previous question paper
      // an become a Pro Students . Thats Why here we are Validate a Payment option is Done or not
      type: Boolean,
      default: null,
    },
    subjects: {
      // Here we identify a student details how much subject they are buy like "one question paper" and "subject all theory" and so on..
      type: [String],
      default: null,
    },
    plan: {
      // validate thru they are normal student or Pro Students means spend some money there ..
      type: String,
      default: "student",
    },
    subjectPdf: {
      //  Here Store we are a Pdf links and Pages Links they are buy .. Work Like a Storing details which subjects pdf they have buy.
      type: [String],
      default: "",
    },
    role: {
      // Validate there id by token that's why they use ..
      type: String,
      default: "student",
    },
    numberOfSubjectBuy: {
      // If a students in class are total 5 subjects and they are just buy a only 2 subjects .
      // so we are show they are buy only 2 subject and also show subject name in frontend.
      type: Number,
      default: 0,
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
    verifyId: {
      // When they are logout and want to login quickly they just put that unique number they set and then login ...
      type: Number,
      default: null,
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

const StudentModels = mongoose.model("student", studentSchema);

export { StudentModels };
