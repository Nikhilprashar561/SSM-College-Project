import { developerModels } from "../models/HelpModels/developer.models.js";
import { studentHelpModels } from "../models/HelpModels/studentsHelp.models.js";
import { uploadSubjectModels } from "../models/HelpModels/uploadSubjects.models.js";
import { StudentModels } from "../models/StudentModels/students.models.js";
import { ApiErrors } from "../utils/ApiError.js";
import { ApiRes } from "../utils/ApiRes.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

const studentHelp = async (req, res) => {
  const { question, subject, description, teacherAssign } = req.body;
  if (!question || !subject || !description || !teacherAssign) {
    throw new ApiErrors(400, "All Fields are required");
  }
  const user = await StudentModels.findById(req.user?._id);
  if (!user) {
    throw new ApiErrors(400, "User Not Found");
  }
  if (user.plan !== "Pro Student") {
    // Check User Are Pro or not
    throw new ApiErrors(
      400,
      "Please First buy a some subject and then come here"
    );
  }
  const userData = user.subjects;
  if (userData.length === 0) {
    throw new ApiErrors(
      400,
      "Sorry to say but you are not buy any type of subject."
    );
  }
  if (!userData.includes(subject)) {
    throw new ApiErrors(400, "That particular subject was not purchased.");
  }
  const questionImagePath = req?.files?.image[0]?.path;
  if (!questionImagePath) {
    throw new ApiErrors(400, "Image url path not found and get");
  }
  const questionImage = await uploadOnCloudinary(questionImagePath);
  if (!questionImage) {
    throw new ApiErrors(400, "failed to upload image");
  }
  const createHelp = await studentHelpModels.create({
    question,
    className: user.className,
    description,
    questionImage: questionImage.secure_url,
    requestBy: user?._id,
    subject,
    teacherAssign,
  });
  if (!createHelp) {
    throw new ApiErrors(400, "Some Error occur when we create a documents");
  }
  return res
    .status(201)
    .json(
      new ApiRes(
        201,
        { userData: createHelp, user: user },
        "Student sent help message successFully"
      )
    );
}; // if when a student become a pro student

const uploadSubject = async (req, res) => {
  const { subject, className, topic, description, subjectPrice } = req.body;
  
  if (!subject || !className || !topic || !description || !subjectPrice) {
    throw new ApiErrors(400, "All fields must be required");
  }
  const user = await developerModels.findById(req.user?._id);
  if (!user) {
    throw new ApiErrors(400, "User not found sorry 😒");
  }
  console.log(req.files);
  const pdfPath = req.files?.pdf[0]?.path;
  console.log("yeh hai path", pdfPath);
  if (!pdfPath) {
    throw new ApiErrors(400, "Pdf Path not find");
  }
  const pdf = await uploadOnCloudinary(pdfPath);
  if (!pdf) {
    throw new ApiErrors(400, "Pdf Was not uploaded");
  }
  const uploadCreate = await uploadSubjectModels.create({
    subject,
    className,
    topic,
    description,
    subjectPrice,
    pdf: pdf.secure_url,
    uploadBy: user?._id,
  });
  if (!uploadCreate) {
    throw new ApiErrors(400, "Some Error while upload subjects");
  }
  return res
    .status(200)
    .json(
      new ApiRes(
        201,
        { modelData: uploadCreate, user: user?.name },
        "Subject Upload by user SuccessFully"
      )
    );
};

export { studentHelp, uploadSubject };
