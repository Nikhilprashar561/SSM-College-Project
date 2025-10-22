// Here Hod can create a lecture time table according to that class and assign teachers means that one particular teacher assign
//  which one classes like that first lecture , second and so on .. and it is same for a hod .
// simple we can say like my BscIT 5 where hod create class lecture time table and assign teacher who take a lecture
//  for that one particular subject .. i understand what i meant ... Note:- This is only create by a hod not a Teacher or other .

import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  lecture: String,
  subject: String,
  teacherAssign: String,
  timing: String,
});

const timeTableSchema = new mongoose.Schema(
  {
    createdBy: {
      // Id which department of hod create a DateSheet, Wheather is from computer , Commerce and Arts
      type: mongoose.Schema.Types.ObjectId,
      ref: "hod",
      required: true,
    },
    title: {
      // Taking a reason why hod create time table.
      type: String,
      required: true,
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
    department: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    days: {
      type: [String],
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
    collegeName: {
      type: String,
      trim: true,
      default: "SSM college dinanagar",
    },
    timeTable: [subjectSchema],
  },
  { timestamps: true }
);

const timeTableModels = mongoose.model("timeTable", timeTableSchema);

export { timeTableModels };
