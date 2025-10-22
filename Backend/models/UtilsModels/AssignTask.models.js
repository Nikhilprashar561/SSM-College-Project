// If Any Teacher and hod want to get some Points and earn some they are just assign to task to their assign classes and earn

import mongoose from "mongoose";

const AssignTaskSchema = new mongoose.Schema(
  {
    task: {
      // Task Topic
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    assignedByRole: {
      // Here we are validate which type of user come to there sent request.
      type: String,
      enum: ["principal", "hod", "teacher"],
      required: true,
      lowercase: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "assignedByRole",
      required: true,
    },
    assignedToRole: {
      // Here we are validate which type of user we are sent to request for task.
      type: String,
      lowercase: true,
      enum: ["hod", "teacher", "student"],
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    timing: {
      type: Date,
      required: true,
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
    images: {
      type: String,
      default: "",
    },
    collageName: {
      type: String,
      trim: true,
      default: "SSM college dinanagar",
    },
    dueDate: {
      // Task Last date
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
    getPoints: {
      // Points Details How many Points are they got after completions
      type: String,
      default: "0",
    },
  },
  { timestamps: true }
);

const AssignTaskModels = mongoose.model("assignTask", AssignTaskSchema);

export { AssignTaskModels };
