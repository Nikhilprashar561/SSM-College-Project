// Here Teacher , Hod and Principal Sent a Notification to a Students and all user ..

import mongoose from "mongoose";

const NotificationsSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    file: { // Files Means if one can sent notification with image so that's why. 
      type: String,
      default:"",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "checkModel",
    },
    checkModel: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["teacher", "hod", "principal"],
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
    collegeName: {
      type: String,
      trim: true,
      default: "SSM college dinanagar",
    },
    department: {
      type: String,
      default:""
    },
    className:{
      type:String,
      default:""
    }
  },
  { timestamps: true }
);

const NotificationsModels = mongoose.model("notification", NotificationsSchema);

export { NotificationsModels };
