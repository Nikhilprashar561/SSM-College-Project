// Here a Students can put complaint against teacher that is did not like a way how they teach .

import mongoose from "mongoose";

const studentComplaintSchema = new mongoose.Schema(
  {
    teacherName: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const studentComplaintModels = mongoose.model(
  "complaint",
  studentComplaintSchema
);

export { studentComplaintModels };
