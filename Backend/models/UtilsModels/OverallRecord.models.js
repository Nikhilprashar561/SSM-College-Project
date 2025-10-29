import mongoose from "mongoose";

// Only Tecaher , HOD and Principal can Access these here Store one Student overall details Performance and their result

const MarkSheetPdfSchema = new mongoose.Schema(
  {
    pdfLink: {
      type: String,
      trim: true,
      default:""
    },
    studentName:{
      type: String,
      required: true
    },
    roll_no:{
      type: Number,
      required: true
    },
    className: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    paper: {
      type: String,
      required: true,
      trim: true,
    },
    teacherAvatar: {
      // Teacher Image Image Who Created Them,
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now(),
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
    description: {
      type: String,
      required: true,
    },
    createBy: {
      type: mongoose.Schema.Types.ObjectId,
      // ref:"",
      required: true,
    },
    department: {
      type: String,
      required: true,
      index: true,
      unique: true,
      enum: {
        values: [
          "Department of Computer Science",
          "Department of Commerce",
          "Department of Arts",
        ],
        message: "Invalid department. Not allowed.",
      },
    },
  },
  { timestamps: true }
);

const MarkSheetPdfModels = mongoose.model("OverallDetail", MarkSheetPdfSchema);

export { MarkSheetPdfModels };