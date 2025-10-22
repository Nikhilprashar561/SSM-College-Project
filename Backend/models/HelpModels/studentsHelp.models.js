// This is for those students who will buy Some Subjects Material and become a Pro Student okay :- That's why we are make that model..
//  where once they buy a subject wheather it is one or more that they ask for developer to get a answer for there new question ..
// i understand what i meant ...

import mongoose from "mongoose";

const studentHelpSchema = new mongoose.Schema(
  {
    question: {
      // Eh Tah Question Direct User he kre ga type frontend te
      // What's a new question they ask for
      type: String,
      required: true,
      trim: true,
    },
    requestBy: {
      // Backend Auth Validation
      // Who Request
      type: mongoose.Schema.Types.ObjectId,
      ref: "students",
      required: true,
    },
    subject: {
      // user Sent a help to developer for asking any question but that one question belong to any one subject
      //  so that why we are here ask for subject but these is not done we also check user ask for these subject
      // but firstly they were buy that one subject or check these in user details documents.

      // Which Subject for they ask and also check that's subject they buy or not...
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    className: {
      // This is we are validate in our backend not taking a data from frontend.
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    description: {
      //  Topic description user manully type in frontend
      type: String,
      required: true,
      trim: true,
    },
    questionImage: {
      // if user want to sent or have a any type of question image without any tesnion they were sent.
      type: String,
      required: true,
      default: "",
    },
    teacherAssign: {
      //That is Pic from frontend check user class and then according to that we are suggest to the user teachers
      // also get and check which teacher assign for that subject ..
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const studentHelpModels = mongoose.model("studentHelp", studentHelpSchema);

export { studentHelpModels };
