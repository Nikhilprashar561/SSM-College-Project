//Help Model where sent HOD, Teacher, Pricipal ... ask for developer to any failure cause and other upgradations..

import mongoose from "mongoose";

const helpSchema = new mongoose.Schema(
  {

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teacher",
    },
    hodId: {
      type: mongoose.Schema.Types.ObjectId, // Verifying who put the help request it's , HOD, Teacher, Pricipal ...
      ref: "hod",
    },
    principalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "principal",
    },

    topic: {
      // Why they Put Request for Help it's core reason...
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Technical", "Academic", "General"],
      required: true,
    },
    message: {
      //  what is the main message they ask and questions
      type: String,
      required: true,
    },
    image: [{
      // Problem images for understand that with better way ...
      type: String,
      default: "",
    }],
    status: {
      // Store when once a they Help Sent okay :- that's request is full filled or not by developers or any other by ....
      type: String,
      enum: ["pending", "in-progress", "resolved"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const helpModels = mongoose.model("help", helpSchema);

export { helpModels };
