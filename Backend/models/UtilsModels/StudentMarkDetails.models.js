// This is a overall result of students wheather it is Final Exam and College Exam ...

import mongoose from "mongoose";

const studentDetails = new mongoose.Schema({
  subject: {
      type: String,
      required: true,
      trim: true,
    },
    totalMark: {
      type: Number,
      required: true,
      trim: true,
    },
    markObtainted: {
      type: Number,
      required: true,
      trim: true,
    },
    grade: {
      type: String,
      required: true,
      trim: true,
    },
    result: {
      type: String,
      required: true,
      trim: true,
    },
    studentAbsent: {
      type: Boolean,
      default: false,
    },
})

const StudentMarkDetailSchema = new mongoose.Schema(
  {
    StudentName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    class: {
      type: String,
      required: true,
    },
    roll_no: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    father_name: {
      type: String,
      required: true,
    },
    mobile_no: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Other"],
        message: "Gender must be either Male, Female, or Other",
      },
      required: true,
    },
    teacherAssign: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "assignModels",
    },
    assignModels: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
      enum: ["teacher", "hod"],
    },
    studentDetails:[studentDetails],
    collegeName:{
      type:String,
      required: true
    },
    motherName:{
      type:String,
      required: true
    },
    overallResult:{
      type:String,
      required: true
    },
    note:{
      type:String,
      default:""
    },
    studentAllDetails:[],
    department: {
      type: String,
      required: true,
      index: true,
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
  },
  { timestamps: true }
);

const StudentMarkDetailModels = mongoose.model(
  "studentMarkDetail",
  StudentMarkDetailSchema
);

export { StudentMarkDetailModels };
