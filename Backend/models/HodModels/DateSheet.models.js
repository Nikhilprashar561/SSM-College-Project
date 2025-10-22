import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  timing: {
    type: Date,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  day: {
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
});

const dateSheetSchema = new mongoose.Schema(
  {
    createdBy: {
      // Id which department of hod create a DateSheet, Wheather is from computer , Commerce and Arts
      type: mongoose.Schema.Types.ObjectId,
      ref: "hod",
      required: true,
    },
    paper: {
      // Exam type
      type: String,
      required: true,
      trim: true,
    },
    className: {
      type: String,
      required: true,
      trim: true,
    },
    collegeName: {
      type: String,
      trim: true,
      default: "SSM college dinanagar",
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    subjects: [subjectSchema],
  },
  { timestamps: true }
);

const dateSheetModels = mongoose.model("dateSheet", dateSheetSchema);

export { dateSheetModels };