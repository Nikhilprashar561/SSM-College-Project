import { helpModels } from "../models/HelpModels/help.models.js";
import { HodModels } from "../models/HodModels/hod.models.js";
import { PrincipalModels } from "../models/PrincipalModels/principal.models.js";
import { TeacherModels } from "../models/TeacherModels/teacher.models.js";
import { EventsModels } from "../models/UtilsModels/Event.models.js";
import { sentMoneyReqModels } from "../models/UtilsModels/sentRequestMoney.models.js";
import { ApiErrors } from "../utils/ApiError.js";
import { ApiRes } from "../utils/ApiRes.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import mongoose from "mongoose";

const EventController = async (req, res) => {
  const { descriptions, text, uploadByModel } = req.body;
  if (!descriptions || !text || !uploadByModel) {
    throw new ApiErrors(400, "All Fields are must be required");
  }
  if (!["teacher", "hod", "principal", "developer"].includes(uploadByModel)) {
    throw new ApiErrors(400, "You have not access to upload a images");
  }
  // let userExist = null;
  const user = req.user;
  if (user?.role != uploadByModel) {
    throw new ApiErrors(400, "You Please change your upload data models");
  }
  // console.log(`Yeh hai user ${user.email}`);
  const imagePath = req?.files?.image[0]?.path;
  if (!imagePath) {
    throw new ApiErrors(400, "Image Path not found");
  }
  const image = await uploadOnCloudinary(imagePath);
  if (!image) {
    throw new ApiErrors(
      400,
      "Some Errors was occurs when we are upload a image"
    );
  }
  const eventCreate = await EventsModels.create({
    descriptions,
    image: image.secure_url,
    text,
    uploadByModel,
    uploadBy: user?._id,
  });
  if (!eventCreate) {
    throw new ApiErrors(400, "Error While create event");
  }
  return res
    .status(200)
    .json(
      new ApiRes(
        201,
        { data: eventCreate, user: user?.name },
        "Event Image upload SuccessFully"
      )
    );
}; // Anyone user can access but not student

const userHelpController = async (req, res) => {
  const { topic, category, message } = req.body;
  if (!topic || !category || !message) {
    throw new ApiErrors(400, "All Fields are required");
  }

  const teacherUser = await TeacherModels.findById(req?.user?._id);
  const hodUser = await HodModels.findById(req?.user?._id);
  const principalUser = await PrincipalModels.findById(req?.user?._id);

  let userType;
  userType =
    teacherUser?.role == "teacher"
      ? "teacher"
      : hodUser?.role == "hod"
        ? "hod"
        : principalUser?.role == "principal"
          ? "principal"
          : "User Not Found";
  console.log(`Behnchod yeh hai user ka type ${userType}`);

  const imagePath = req?.files?.image[0]?.path;
  let imageLink;
  if (imagePath) {
    const image = await uploadOnCloudinary(imagePath);
    if (!image) {
      throw new ApiErrors(400, "Sorry Image was not found");
    }
    imageLink = image.secure_url;
    console.log(`Yeh raha PC 😒 image link ${imageLink}`);
  }

  const createHelp = await helpModels.create({
    category,
    image: imageLink,
    message,
    topic,
    hodId: hodUser?._id,
    principalId: principalUser?._id,
    teacherId: teacherUser?._id,
  });
  if (!createHelp) {
    throw new ApiErrors(400, "Some Error While User Sent Help Request");
  }
  return res
    .status(200)
    .json(
      new ApiRes(
        201,
        { data: createHelp, userType: userType },
        "Your Help Sent SuccessFully"
      )
    );
}; // Anyone user can access but not student

const sentRequestByMoneyController = async (req, res) => {
  const { reason, description, totalCoins, checkRequest } = req.body;
  if (!reason || !description || !totalCoins || !checkRequest) {
    throw new ApiErrors(400, "All Field are required");
  }
  const user = req?.user;
  // console.log({ user });
  if (totalCoins < 100) {
    throw new ApiErrors(400, "You Should first earn some coins then came back");
  }
  if (!["teacher", "student", "hod"].includes(checkRequest)) {
    throw new ApiErrors(400, "Unauthorized request");
  }
  if(user?.role != checkRequest){
    throw new ApiErrors(400, "You have not access to sent request")
  }
  // if(!mongoose.Types.ObjectId.isValid)
  const createRequest = await sentMoneyReqModels.create({
    description,
    reason,
    totalAmount: Number(totalCoins),
    checkRequest,
    totalCoins,
    requestBy: user?._id,
  });
  if (!createRequest) {
    throw new ApiErrors(400, "Some Error occurs when we're sent request");
  }
  return res
    .status(200)
    .json(
      new ApiRes(
        200,
        { data: createRequest, userType: { user } },
        "Your Request for money Sent successFully"
      )
    );
};

const timeTableController = async (req, res) => {};

const NotificationController = async (req, res) => {}; // Anyone user can access but not student

const DateSheetController = async (req, res) => {};

const PaperAssignController = async (req, res) => {};

const AssignTaskController = async (req, res) => {}; // Anyone user can access but not student

const studentMarkSheetController = async (req, res) => {};

const overallRecordController = async (req, res) => {};

const studentMarksDetailsController = async (req, res) => {};

export {
  timeTableController,
  userHelpController,
  DateSheetController,
  PaperAssignController,
  AssignTaskController,
  EventController,
  NotificationController,
  overallRecordController,
  sentRequestByMoneyController,
  studentMarkSheetController,
  studentMarksDetailsController,
};
