// This is a overall result of students wheather it is Final Exam and College Exam ...

import mongoose from "mongoose";

const StudentMarkDetailSchema = new mongoose.Schema(
  {
    StudentName: {
      type: String,
      required: true,
    },
    StudentUsername: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
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
        values: ["male", "female", "other"],
        message: "Gender must be either male, female, or other",
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
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const StudentMarkDetailModels = mongoose.model(
  "studentMarkDetail",
  StudentMarkDetailSchema
);

export { StudentMarkDetailModels };
