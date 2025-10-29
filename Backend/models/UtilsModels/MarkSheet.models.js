// Teacher And Hod Create a Models Marksheet and final result of a Mst and ut . this is a reason is start to build this project

import mongoose from "mongoose";

const studentDetails = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  roll_no: {
    type: Number,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  mobile_no: {
    type: String,
    required: true,
  },
  totakMark: {
    type: Number,
    required: true,
  },
  studentGetMark: {
    type: Number,
    required: true,
  },
  overallResult: {
    type: String,
    required: true,
  },
});

const MarkSheetSchema = new mongoose.Schema(
  {
    studentsDetails: [studentDetails],
    className: {
      type: String,
      required: true,
      trim: true,
    },
    collegeName: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    examType: {
      type: String,
      required: true,
      trim: true,
      enum: ["Unit Test", "MST", "Class Test", "Final Exam", "Gndu Mark Sheet"],
    },
    teacherAssign: {
      // Who Create a that Marksheet Only Assign Teacher
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
    Date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    days: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    pdfLink: {
      // Pdf Link Who Create after Marksheet Done
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: true,
    },
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

const MarkSheetModels = mongoose.model("marksheet", MarkSheetSchema);

export { MarkSheetModels };
