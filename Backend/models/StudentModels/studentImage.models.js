// In this model one student ask and chat with other student ask with their topic problem class subjects problem and other work as a
//  chating application . if any student have a problem in any question or regarding to any subject topic they just upload a image on there
//  and if any one have a solutions then thet problem is solved ... i understood what i want to implement ...

import mongoose from "mongoose";

const studentImageSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      index: true,
    },
    uploadBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
      required: true,
    },
  },
  { timestamps: true }
);

const studentImageModels = mongoose.model("studentImage", studentImageSchema);

export { studentImageModels };
