// Here All type of user upload a college Events images not include students .

import mongoose from "mongoose";

const EventsSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      index: true
    },
    descriptions: {
      type: String,
      default: "",
      index: true
    },
    uploadBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "uploadByModel",
    },
    uploadByModel: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["teacher", "hod", "principal", "developer"],
    },
  },
  { timestamps: true }
);

const EventsModels = mongoose.model("event", EventsSchema);

export { EventsModels };

/* uploadBy : {
        teacher:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "teacher"
        },
        hod:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "hod"
        },
        principal:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "principal"
        },
        developer:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "developer"
        },
        required: true
    } */