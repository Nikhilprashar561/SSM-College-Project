import express from "express";
import {
  changeAvatar,
  changeEmail,
  changePassword,
  deactivateAccount,
  forgotPassword,
  login,
  logout,
  register,
  studentAchivementController,
  studentComplaintController,
  studentFeedbackController,
  studentImageController,
  updateStudentDetailsOnDB,
  verifyOtpEmail,
  verifyStudentsEmail,
  verifyViaEmail,
} from "../controllers/student.controllers.js";
import { upload } from "../middlewares/multer.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router
  .route("/register")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), register);

router.route("/verify-email/code/:unique").get(verifyStudentsEmail);
router.route("/verifyEmail").post(verifyViaEmail);
router.route("/login").post(login);
router.route("/logout").get(auth, logout);
router.route("/deactivate").get(auth, deactivateAccount);
router.route("/updateDetails").patch(auth, updateStudentDetailsOnDB);
router
  .route("/changeAvatar")
  .patch(auth, upload.fields([{ name: "avatar", maxCount: 1 }]), changeAvatar);

router.route("/changePassword").patch(auth, changePassword);
router.route("/changeEmail").patch(auth, changeEmail);
router.route("/forgotPassword").post(forgotPassword);
router.route("/verifyOtp").post(verifyOtpEmail);

router
  .route("/achivement")
  .post(
    auth,
    upload.fields([{ name: "image", maxCount: 10 }]),
    studentAchivementController
  );
router
  .route("/imageSent")
  .post(
    auth,
    upload.fields([{ name: "image", maxCount: 20 }]),
    studentImageController
  );
router.route("/complaint").post(auth, studentComplaintController);
router.route("/feedback").post(auth, studentFeedbackController);

export default router;
