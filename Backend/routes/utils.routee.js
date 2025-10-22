import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
  AssignTaskController,
  DateSheetController,
  EventController,
  NotificationController,
  overallRecordController,
  PaperAssignController,
  sentRequestByMoneyController,
  studentMarksDetailsController,
  studentMarkSheetController,
  timeTableController,
  userHelpController,
} from "../controllers/utils.controllers.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/timeTable").post(auth, timeTableController);
router
  .route("/userHelp")
  .post(
    auth,
    upload.fields([{ name: "image", maxCount: 5 }]),
    userHelpController
  );
router.route("/dateSheet").post(auth, DateSheetController);
router.route("/paperAssign").post(auth, PaperAssignController);
router.route("/assignTask").post(auth, AssignTaskController);
router
  .route("/events")
  .post(auth, upload.fields([{ name: "image", maxCount: 5 }]), EventController);
router.route("/notifications").post(auth, NotificationController);
router.route("/overallRecord").post(auth, overallRecordController);
router.route("/sentRequestByMoney").post(auth, sentRequestByMoneyController);
router.route("/studentMarkSheet").post(auth, studentMarkSheetController);
router.route("/studentMarksDetails").post(auth, studentMarksDetailsController);

export default router;
