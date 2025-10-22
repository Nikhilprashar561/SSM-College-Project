import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { studentHelp, uploadSubject } from "../controllers/core.controllers.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router
  .route("/studentHelp")
  .post(auth, upload.fields([{ name: "image", maxCount: 1 }]), studentHelp);

router
  .route("/uploadSubject")
  .post(auth, upload.fields([{name: "pdf", maxCount:1}]), uploadSubject);

export default router;
