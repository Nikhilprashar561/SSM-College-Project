// In this models where a that one department of hod create a sheet where they create a Place where they conduct a
// Paper like Mst , ut and for other Task same like that in the final Universtiy paper where a one page are on board and inside class name
// it's roll no and Paper name and it's all about .. Note:- This is only create by a hod not a Teacher or other .

import mongoose from "mongoose";

const roll_no = new mongoose.Schema({
  roll_no: {
    type: String,
    required: true,
  },
});

const departmentRoll_no = new mongoose.Schema({
  row: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  roll_no: [roll_no],
});

const paperAssignPlaceSchema = new mongoose.Schema(
  {
    cretaedBy: {
      // Id which department of hod create a DateSheet, Wheather is from computer , Commerce and Arts
      type: mongoose.Schema.Types.ObjectId,
      ref: "hod",
      required: true,
    },
    collegeName: {
      type: String,
      trim: true,
      default: "SSM college dinanagar",
    },
    className: {
      type: String,
      required: true,
      trim: true,
    },
    room_no: {
      type: String,
      required: true,
      trim: true,
    },
    paper: {
      type: String,
      required: true,
    },
    timing: {
      type: Date,
      required: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    roll_no: [departmentRoll_no],
    teacherDuty: {
      type: String,
      required: true,
      trim: true,
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
    department: {
      // For Which Department
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const paperAssignPlaceModels = mongoose.model(
  "paperPlace",
  paperAssignPlaceSchema
);

export { paperAssignPlaceModels };
