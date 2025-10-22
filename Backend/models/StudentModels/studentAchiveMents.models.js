// In this model where one students upload their acheivement and winning moments on college their id to show case a all type of user in the site.

import mongoose from "mongoose";

const studentAchiveMentsSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    uploadBy: {
      // Which students Upload a that our acheivement images and details
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
      required: true,
    },
  },
  { timestamps: true }
);

const studentAchiveMentsModels = mongoose.model(
  "studentAchivements",
  studentAchiveMentsSchema
);

export { studentAchiveMentsModels };
