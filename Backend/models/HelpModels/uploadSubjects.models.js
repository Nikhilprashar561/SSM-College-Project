// In this Models where a normal students become a pro students buy a subject according to their class.
// This models is managed by developer..

import mongoose from "mongoose";

const uploadSubjectSchema = new mongoose.Schema(
  {
    pdf: {
      // That's one subject overall pdf
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    subject: {
      // Subject name
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    className: {
      // also put class name which particular subject assign for which class..
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    topic: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    subjectPrice: {
      type: Number,
      required: true,
      trim: true,
    },
    numberOfBuy:{
      type: Number,
      default:0
    },
    uploadBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "developers",
    },
  },
  { timestamps: true }
);

const uploadSubjectModels = mongoose.model(
  "uploadSubject",
  uploadSubjectSchema
);

export { uploadSubjectModels };
