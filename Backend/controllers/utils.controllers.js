import { helpModels } from "../models/HelpModels/help.models.js";
import { dateSheetModels } from "../models/HodModels/DateSheet.models.js";
import { HodModels } from "../models/HodModels/hod.models.js";
import { paperAssignPlaceModels } from "../models/HodModels/PaperAssignPlace.models.js";
import { timeTableModels } from "../models/HodModels/TimeTables.models.js";
import { PrincipalModels } from "../models/PrincipalModels/principal.models.js";
import { TeacherModels } from "../models/TeacherModels/teacher.models.js";
import { AssignTaskModels } from "../models/UtilsModels/AssignTask.models.js";
import { EventsModels } from "../models/UtilsModels/Event.models.js";
import { MarkSheetModels } from "../models/UtilsModels/MarkSheet.models.js";
import { NotificationsModels } from "../models/UtilsModels/Notifications.models.js";
import { MarkSheetPdfModels } from "../models/UtilsModels/OverallRecord.models.js";
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
    if (!imagePath) {
      throw new ApiErrors(400, "Image was not found");
    }
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
  if (user?.role != checkRequest) {
    throw new ApiErrors(400, "You have not access to sent request");
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

const timeTableController = async (req, res) => {
  const {
    title,
    className,
    room_no,
    date,
    days,
    collegeName,
    department,
    timeTable,
  } = req.body;
  if (
    !title ||
    !className ||
    !room_no ||
    !date ||
    !days ||
    !collegeName ||
    !timeTable ||
    !department
  ) {
    throw new ApiErrors(400, "All fields are required");
  }

  const user = req?.user;

  console.log(`Yeh hai Behn ka loda user ${user}`);

  if (user.department != department) {
    throw new ApiErrors(
      400,
      "Sorry to say but you have a not access to create these class Time table"
    );
  }

  // console.log(timeTable);
  const checkTimeTable = await timeTableModels.findOne({
    $or: [{ className }, { room_no }],
  });
  if (checkTimeTable) {
    if (checkTimeTable.className === className) {
      throw new ApiErrors(400, "This class timetable is already created");
    } else if (checkTimeTable.room_no === room_no) {
      throw new ApiErrors(400, "This room timetable is already created");
    } else if (checkTimeTable.timeTable) {
      throw new ApiErrors(400, "This class is already assigned to a teacher");
    }
  }

  const createTimeTable = await timeTableModels.create({
    className,
    collegeName,
    date,
    days,
    department,
    room_no,
    timeTable,
    title,
    createdBy: user?._id,
  });
  if (!createTimeTable) {
    throw new ApiErrors(400, "Some Error was occur to create a Time Table");
  }

  return res
    .status(200)
    .json(
      new ApiRes(
        201,
        { Data: createTimeTable, user: user },
        "Class Time Table was created Successfully"
      )
    );
};

const NotificationController = async (req, res) => {
  const { collegeName, text, description, date, day, department, className } =
    req.body;
  if (!text || !description || !collegeName) {
    throw new ApiErrors(400, "Text and descriptions are required");
  }
  const user = req?.user;
  if (user.role == "student") {
    throw new ApiErrors(400, "You have not authority to access these page.");
  }
  const imagePath = req?.files?.image[0]?.path;
  let imageLink;
  if (imagePath) {
    if (!imagePath) {
      throw new ApiErrors(400, "Image was not found");
    }
    const image = await uploadOnCloudinary(imagePath);
    if (!image) {
      throw new ApiErrors(400, "Sorry Image was not found");
    }
    imageLink = image.secure_url;
  }
  const createNotification = await NotificationsModels.create({
    className: className ? className : "For Every Classes",
    collegeName,
    checkModel: user?.role,
    file: imageLink,
    date,
    day,
    department: department ? department : "Latest Notification",
    text,
    description,
    createdBy: user?._id,
  });
  if (!createNotification) {
    throw new ApiErrors(400, "Error occure while create a notification");
  }
  return res
    .status(201)
    .json(
      new ApiRes(
        200,
        { data: createNotification, user: user?.firstname },
        "Notification created SuccessFully"
      )
    );
}; // Anyone user can access but not student

const AssignTaskController = async (req, res) => {
  const {
    task,
    description,
    assignedToRole,
    className,
    date,
    timing,
    days,
    collageName,
    dueDate,
  } = req.body;
  if (
    !task ||
    !description ||
    !assignedToRole ||
    !date ||
    !timing ||
    !days ||
    !dueDate
  ) {
    throw new ApiErrors(400, "All fields are required");
  }
  const user = req?.user;
  let principalRole;
  let teacherAndHod;
  if (user?.role == "pricipal") {
    principalRole = "For Every Department";
  }
  if (user?.role == "teacher" || user?.role == "hod") {
    teacherAndHod = user?.department;
  }
  const imagePath = req?.files?.image[0]?.path;
  let imageLink;
  if (imagePath) {
    if (!imagePath) {
      throw new ApiErrors(400, "Image was not found");
    }
    const image = await uploadOnCloudinary(imagePath);
    if (!image) {
      throw new ApiErrors(400, "Sorry Image was not found");
    }
    imageLink = image.secure_url;
  }
  const createAssignTask = await AssignTaskModels.create({
    assignedToRole,
    assignedByRole: user?.role,
    collageName,
    className: className ? className : "For Every Classes",
    date,
    days,
    department: principalRole ? principalRole : teacherAndHod,
    description,
    dueDate,
    images: imageLink,
    task,
    timing,
    createdBy: user?._id,
  });
  if (!createAssignTask) {
    throw new ApiErrors(400, "Error occur while creating a assign taks");
  }
  return res
    .status(200)
    .json(
      new ApiRes(
        201,
        { data: createAssignTask, user: user?.firstname },
        "Assign task created successfully"
      )
    );
}; // Anyone user can access but not student

const PaperAssignController = async (req, res) => {
  const {
    collegeName,
    className,
    room_no,
    paper,
    timing,
    subject,
    teacherDuty,
    roll_no,
    date,
    day,
  } = req.body;
  if (
    !collegeName ||
    !className ||
    !room_no ||
    !paper ||
    !timing ||
    !subject ||
    !teacherDuty ||
    !roll_no ||
    !date ||
    !day
  ) {
    throw new ApiErrors(400, "All fields are required");
  }
  const check = await paperAssignPlaceModels.findOne({
    $or: [
      { className },
      { room_no },
      { subject },
      { teacherDuty },
      { roll_no },
    ],
  });
  if (check) {
    if (check.className === className) {
      throw new ApiErrors(
        400,
        "These class already assign for the Paper Place"
      );
    } else if (check.room_no === room_no) {
      throw new ApiErrors(400, "These Room already assign for the Paper Place");
    } else if (check.subject === subject) {
      throw new ApiErrors(
        400,
        "These Subject already assign for the Paper Place"
      );
    } else if (check.teacherDuty === teacherDuty) {
      throw new ApiErrors(
        400,
        "These Teacher already assign for the Paper Place"
      );
    } else {
      throw new ApiErrors(
        400,
        "These Roll Number already assign for the Paper Place"
      );
    }
  }
  const user = req?.user;
  const createPaperPlace = await paperAssignPlaceModels.create({
    className,
    collegeName,
    date,
    day,
    department: user?.department,
    paper,
    roll_no,
    room_no,
    subject,
    teacherDuty,
    timing,
    cretaedBy: user?._id,
  });
  if (!createPaperPlace) {
    throw new ApiErrors(
      400,
      "Error occur when we are create a Paper Assign Place"
    );
  }
  return res
    .status(201)
    .json(
      new ApiRes(
        200,
        { data: createPaperPlace, user: user?.firstname + user?.lastname },
        "Paper Place Assign Classes created sucessfully"
      )
    );
};

const DateSheetController = async (req, res) => {
  const { paper, className, collegeName, department, description, subjects } =
    req.body;
  if (
    !paper ||
    !className ||
    !collegeName ||
    !department ||
    !description ||
    !subjects
  ) {
    throw new ApiErrors(400, "All Fields are required");
  }
  const check = await dateSheetModels.findOne({ className: className });
  if (check) {
    if (check.className === className) {
      throw new ApiErrors(
        400,
        "Sorry 😒 but these class already datesheet created"
      );
    }
  }
  const user = req?.user;
  if (user?.department != department) {
    throw new ApiErrors(
      400,
      "You have not access to create these department Date Sheet"
    );
  }
  const CreateDateSheet = await dateSheetModels.create({
    className,
    collegeName,
    department,
    description,
    paper,
    subjects,
    createdBy: user?._id,
  });
  if (!CreateDateSheet) {
    throw new ApiErrors(400, "Some Error Occur when we are create a Datesheet");
  }
  return res
    .status(200)
    .json(
      new ApiRes(
        201,
        { data: CreateDateSheet, user: `${user?.firstname} ${user?.lastname}` },
        `DateSheet was created for ${className} successfully`
      )
    );
};

const studentMarkSheetController = async (req, res) => {
  const {
    className,
    collegeName,
    department,
    description,
    examType,
    subject,
    studentsDetails,
  } = req.body;
  if (!subject || !examType || !department || !studentsDetails) {
    throw new ApiErrors(400, "All fields are required");
  }
  const check = await MarkSheetModels.findOne({ subject });
  if (check) {
    if (check.subject === subject) {
      throw new ApiErrors(
        400,
        "With these subject name marksheet already Please delete Previous one."
      );
    }
  }
  const user = req?.user;
  if (user?.department != department) {
    throw new ApiErrors(
      400,
      "You have not access to create these deparment Marksheet"
    );
  }
  const currentDay = new Date(Date.now()).toLocaleString("en-US", {
    weekday: "long",
  });
  console.log(currentDay);

  const createMarkSheet = await MarkSheetModels.create({
    assignModels: user?.role,
    className,
    collegeName,
    days: currentDay,
    department,
    description,
    examType,
    subject,
    teacherAssign: user?._id,
    studentsDetails,
  });
  if (!createMarkSheet) {
    throw new ApiErrors(400, "Error was occur when we are create marksheet");
  }
  return res
    .status(200)
    .json(
      new ApiRes(
        201,
        { data: createMarkSheet, user: user?.firstname + "" + user?.lastname },
        `Marksheet was created SuccessFully by ${user?.firstname} Mam`
      )
    );
};

const overallRecordController = async (req, res) => {
  const {
    className,
    description,
    paper,
    roll_no,
    subject,
    studentName,
    department,
  } = req.body;
  if (
    !className ||
    !description ||
    !paper ||
    !roll_no ||
    !subject ||
    !studentName ||
    !department
  ) {
    throw new ApiErrors(400, "All field are required");
  }
  const check = await MarkSheetPdfModels.findOne({ subject });
  if (check) {
    if (check.subject === subject) {
      throw new ApiErrors(
        400,
        "With these subject name marksheet already Please delete Previous one."
      );
    }
  }
  const user = req?.user;
  if (user?.department != department) {
    throw new ApiErrors(400, "You have not Access to Create");
  }
  const currentDay = new Date(Date.now()).toLocaleString("en-US", {
    weekday: "long",
  });
  // console.log(currentDay);
  const createOverallRecord = await MarkSheetPdfModels.create({
    className,
    description,
    paper,
    roll_no,
    subject,
    studentName,
    createBy: user?._id,
    department: user?.department,
    teacherAvatar:user?.avatar,
    days: currentDay
  });
  if (!createOverallRecord) {
    throw new ApiErrors(400, "Some Error occur while create overall record");
  }
  return res
    .status(200)
    .json(
      new ApiRes(
        200,
        createOverallRecord,
        `Overall record was created successFully by ${user?.firstname}`
      )
    );
};

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
