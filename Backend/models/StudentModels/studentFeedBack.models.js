// Feedback form here a student gives a feedback to a our teacher at the end of a semester or in mid . that teacher how they teach us class and other things..

import mongoose from "mongoose";

const studentFeedBackSchema = new mongoose.Schema(
  {
    teacherName: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    }, // Hello
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const studentFeedBackModels = mongoose.model("feedback", studentFeedBackSchema);

export { studentFeedBackModels };
