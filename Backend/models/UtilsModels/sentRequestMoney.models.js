// If End of a Semester and After they have a complete all Points they just will sent a Money request to won a result ..

import mongoose from "mongoose";

const sentMoneyReqSchema = new mongoose.Schema(
  {
    requestBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "checkRequest",
      trim: true,
    },
    checkRequest: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      enum: ["teacher", "student", "hod"],
    },
    reason: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    totalCoins: {
      type: String,
      default: 0,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "resolved"],
      default: "pending",
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    payment: {
      type: Boolean,
      default: false,
    },
    totalAmount:{
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

const sentMoneyReqModels = mongoose.model(
  "sentRequestMoney",
  sentMoneyReqSchema
);

export { sentMoneyReqModels };