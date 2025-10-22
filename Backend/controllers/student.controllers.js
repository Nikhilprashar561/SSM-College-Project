import { SendTransPort } from "../config/nodemailer.js";
import { SendEmail } from "../config/resend.js";
import { studentAchiveMentsModels } from "../models/StudentModels/studentAchiveMents.models.js";
import { studentComplaintModels } from "../models/StudentModels/studentComplaint.models.js";
import { studentFeedBackModels } from "../models/StudentModels/studentFeedBack.models.js";
import { studentImageModels } from "../models/StudentModels/studentImage.models.js";
import { StudentModels } from "../models/StudentModels/students.models.js";
import { generateAccessToken } from "../utils/AccessJWT.js";
import { ApiErrors } from "../utils/ApiError.js";
import { ApiRes } from "../utils/ApiRes.js";
import { passwordHashing } from "../utils/bcrypt.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { isPasswordCorrect } from "../utils/isPasswordCorrect.js";
import { generateRefreshToken } from "../utils/RefreshJWT.js";
import { verifyEmailTemplate } from "../utils/verifyEmailTemplate.js";
import { verifyOtpEmailTemplate } from "../utils/verifyOtpEmailTemplate.js";

const register = async (req, res) => {
  const {
    fullname,
    email,
    password,
    className,
    roll_no,
    mobile_no,
    father_name,
    gender,
  } = req.body;

  if (!fullname || !email || !password) {
    throw new ApiErrors(400, "All Fields are Required");
  }

  const existing = await StudentModels.findOne({
    $or: [{ email }, { roll_no }],
  });

  if (existing) {
    throw new ApiErrors(400, "Student Already Register With this Credentials");
  }

  const hashPassword = await passwordHashing(password);

  if (!hashPassword) {
    throw new ApiErrors(400, "Password was not hashed");
  }

  if (roll_no.toString().length > 4 && roll_no.toString().length < 4) {
    throw new ApiErrors(400, "Invalid Roll Number");
  }

  if (mobile_no.toString().length > 10) {
    throw new ApiErrors(400, "Invalid Mobile Number");
  }

  const avatarFilePath = req?.files?.avatar[0]?.path;

  if (!avatarFilePath) {
    throw new ApiErrors(400, "Image Not Found in request");
  }

  // console.log("yeh req hai", avatarFilePath);

  const avatar = await uploadOnCloudinary(avatarFilePath);

  // console.log("yaha hai upload image", avatar);

  if (!avatar) {
    throw new ApiErrors(400, "Image was Not Uploaded on Cloudinary");
  }

  const token = Math.floor(1000 + Math.random() * 9000);
  const now = new Date();
  const expiryTime = new Date(now.getTime() + 30 * 60 * 1000);

  const verifyUrl = `${process.env.FRONTEND_URL}/api/student/verify-email/code/${token}`;

  const verifyEmail = await SendTransPort({
    sendTom: email,
    Subject: `Verifying ${fullname} via email`,
    html: verifyEmailTemplate({
      name: fullname,
      url: verifyUrl,
    }),
  });

  const createStudent = await StudentModels.create({
    fullname,
    email,
    password: hashPassword,
    className,
    roll_no,
    mobile_no,
    father_name,
    gender,
    avatar: avatar?.secure_url,
    token: token,
    tokenExpiry: expiryTime,
  });

  if (!createStudent) {
    throw new ApiErrors(400, "Student was Not Regesiter or Created");
  }

  return res
    .status(200)
    .json(new ApiRes(201, createStudent, "User Was Register SuccessFully"));
};

const verifyStudentsEmail = async (req, res) => {
  // Dynamic web Page
  const { unique } = req.params;

  const validateToken = await StudentModels.findOne({ token: unique });

  if (!validateToken) {
    throw new ApiErrors(400, "User & Token not found");
  }

  if (validateToken.isVerify === true) {
    throw new ApiErrors(400, "You are already verify");
  }

  if (validateToken.token != parseInt(unique)) {
    throw new ApiErrors(400, "Invalid token");
  }

  if (validateToken.tokenExpiry < new Date()) {
    throw new ApiErrors(400, "Your Token is Expired");
  }

  validateToken.isVerify = true;
  validateToken.token = null;
  validateToken.tokenExpiry = null;
  await validateToken.save();

  return res
    .status(200)
    .json(new ApiRes(200, validateToken, "Student Email Verify Successfully"));
};

const verifyViaEmail = async (req, res) => {
  // These Case Use When User is Forgot to verify email regesiter time then he has only one last option with there register they verify there self
  const { email } = req.body;

  if (!email) {
    throw new ApiErrors(400, "Email is required");
  }

  const checkEmail = await StudentModels.findOne({ email });

  if (!checkEmail) {
    throw new ApiErrors(400, "Email not found");
  }

  if (checkEmail.isVerify === true) {
    throw new ApiErrors(400, "Your Email is already verify");
  }

  const randomVal = Math.floor(1000 + Math.random() * 9000);
  const now = new Date();
  const expiryTime = new Date(now.getTime() + 30 * 60 * 1000);

  const verifyUrl = `${process.env.FRONTEND_URL}/api/student/verify-email/code/${randomVal}`;

  const verifyEmail = await SendTransPort({
    sendTom: email,
    Subject: `Verifying  ${checkEmail.fullname} via Email Address`,
    html: verifyEmailTemplate({
      name: checkEmail.fullname,
      url: verifyUrl,
    }),
  });

  checkEmail.token = randomVal;
  checkEmail.tokenExpiry = expiryTime;
  await checkEmail.save();

  return res.status(200).json(new ApiRes(200, checkEmail, "Check your Email"));
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiErrors(400, "Email & Password is Required");
  }

  const checkUser = await StudentModels.findOne({ email });

  if (!checkUser) {
    throw new ApiErrors(400, "User Not Found with this Email Address");
  }

  if (checkUser.isVerify === false) {
    throw new ApiErrors(400, "Please Verify Your Email first then login");
  }

  const dbPassword = checkUser.password;

  const passwordCompare = await isPasswordCorrect({ password, dbPassword });

  if (!passwordCompare) {
    throw new ApiErrors(400, "Password not validate");
  }
  const payload = {
    _id: checkUser._id,
    name: checkUser.fullname,
    email: checkUser.email,
    designation: checkUser.designation,
    role: checkUser.role,
  };

  const refreshPayload = {
    _id: checkUser._id,
  };

  console.log(payload);
  console.log(refreshPayload);

  const accessToken = await generateAccessToken(payload);
  const refreshToken = await generateRefreshToken(refreshPayload);

  if (!accessToken || !refreshToken) {
    throw new ApiErrors(400, "Tokens not get");
  }

  checkUser.token = null;
  checkUser.tokenExpiry = null;

  checkUser.refresh_token = refreshToken;
  await checkUser.save();

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiRes(
        200,
        { user: checkUser, accessToken, refreshToken },
        "User Login SuccessFully"
      )
    );
};

const logout = async (req, res) => {
  const find = await StudentModels.findById(req?.user);

  find.refresh_token = null;
  // find.isVerify = false;

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiRes(201, find, "User Logout Check SuccessFully"));
};

const deactivateAccount = async (req, res) => {
  const user = await StudentModels.findByIdAndDelete(req.user?._id);

  if (!user) {
    throw new ApiErrors(400, "Unable to process account delete");
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiRes(200, "Student your Account delete successfully"));
};

const updateStudentDetailsOnDB = async (req, res) => {
  const { fullname, mobile_no, gender, verifyId } = req.body;

  const user = await StudentModels.findByIdAndUpdate(
    req.user?._id,
    { fullname, mobile_no, gender, verifyId },
    { new: true }
  );

  if (!user) {
    throw new ApiErrors(400, "Some Error While Update User Details");
  }

  return res
    .status(200)
    .json(new ApiRes(200, user, "User Details Update SuccessFully"));
};

const changeAvatar = async (req, res) => {
  console.log(req.files);
  const avatarLocalFilePath = req.files?.avatar[0]?.path;
  console.log(avatarLocalFilePath);

  if (!avatarLocalFilePath) {
    throw new ApiErrors(400, "Avatar file path not found");
  }

  const avatar = await uploadOnCloudinary(avatarLocalFilePath);

  if (!avatar) {
    throw new ApiErrors(400, "Avatar Image Was Not Uploaded");
  }

  const user = await StudentModels.findByIdAndUpdate(
    req.user?._id,
    { avatar: avatar.secure_url },
    { new: true }
  );

  if (!user) {
    throw new ApiErrors(400, "Some Error While Uploading a Avatar Image");
  }

  return res
    .status(200)
    .json(new ApiRes(200, user, "Avatar Image Change SuccessFully"));
};

const changeEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiErrors(400, "Email is Required");
  }
  const user = await StudentModels.findById(req.user?._id);

  if (user.email === email) {
    throw new ApiErrors(
      400,
      "With this email user alerady register try another"
    );
  }

  user.isVerify = false;

  const now = new Date();
  const expiryTime = new Date(now.getTime() + 30 * 60 * 1000);
  const token = Math.floor(1000 + Math.random() * 9000);

  const verifyUrl = `${process.env.FRONTEND_URL}/api/student/verify-email/code/${token}`;

  const verifyEmail = await SendTransPort({
    sendTom: email,
    Subject: `Verifying ${user.fullname} new email`,
    html: verifyEmailTemplate({
      name: user?.fullname,
      url: verifyUrl,
    }),
  });

  user.token = token;
  user.tokenExpiry = expiryTime;
  user.email = email;
  await user.save();

  return res
    .status(200)
    .json(new ApiRes(200, user, "Email is Update ! Please Verify now"));
};

const changePassword = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;

  if (!newPassword || !confirmPassword) {
    throw new ApiErrors(400, "All Files are required");
  }

  if (newPassword != confirmPassword) {
    throw new ApiErrors(400, "Password not match");
  }

  const password = await passwordHashing(newPassword);

  if (!password) {
    throw new ApiErrors(400, "Password not hashed");
  }

  const user = await StudentModels.findByIdAndUpdate(req.user?._id, {
    password,
  });

  if (!user) {
    throw new ApiErrors(400, "Some Error While Change Password");
  }

  return res
    .status(200)
    .json(new ApiRes(200, user, "Password Change SuccessFully"));
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiErrors(400, "Email is Required");
  }
  const checkUser = await StudentModels.findOne({ email });

  if (!checkUser) {
    throw new ApiErrors(400, "User not found with this email");
  }
  const now = new Date();
  const expiryTime = new Date(now.getTime() + 30 * 60 * 1000);
  const otp = Math.floor(1000 + Math.random() * 9000);

  checkUser.verifyOtp = otp;
  checkUser.OtpExpiry = expiryTime;
  await checkUser.save();

  const desc = `Hi ${checkUser.fullname} verify your otp`;
  const org = `Welcome to SSM College Dinanagar`;

  const verifyEMail = await SendTransPort({
    sendTom: email,
    Subject: `Verify ${checkUser.fullname} OTP`,
    html: verifyOtpEmailTemplate({
      name: checkUser.fullname,
      otp: otp,
      description: desc,
      organization: org,
    }),
  });

  return res
    .status(200)
    .json(new ApiRes(200, checkUser, "Check Your Email OTP is send"));
};

const verifyOtpEmail = async (req, res) => {
  const { otp, email } = req.body;

  if (!otp) {
    throw new ApiErrors(400, "OTP is required");
  }
  const checkData = await StudentModels.findOne({ email });

  if (!checkData) {
    throw new ApiErrors(400, "user not foound");
  }
  const myDate = new Date();

  if (checkData.OtpExpiry < myDate) {
    throw new ApiErrors(400, "Your Token is Expired");
  }

  if (checkData.verifyOtp != otp) {
    throw new ApiErrors(400, "Your Otp is incorrect");
  }

  checkData.verifyOtp = "";
  checkData.OtpExpiry = null;
  await checkData.save();

  return res
    .status(200)
    .json(new ApiRes(200, checkData, "User Verified SuccessFully"));
};

const studentAchivementController = async (req, res) => {
  const { text, description } = req.body;
  if (!text) {
    throw new ApiErrors(400, "Title must me need");
  }
  const findUser = await StudentModels.findById(req.user?._id);
  if (!findUser) {
    throw new ApiErrors(400, "user not found with this id");
  }

  console.log(req?.files);
  const imagefilepath = req?.files?.image[0]?.path;

  console.log("Yeh hai BSDK file path", imagefilepath);

  if (!imagefilepath) {
    throw new ApiErrors(400, "Image Path no found Sorry");
  }

  const image = await uploadOnCloudinary(imagefilepath);
  if (!image) {
    throw new ApiErrors(
      400,
      "Some Error While Uploading a image on Cloudinary"
    );
  }
  const createAchivement = await studentAchiveMentsModels.create({
    text: text,
    description: description,
    image: image.secure_url,
    uploadBy: findUser?._id,
  });
  if (!createAchivement) {
    throw new ApiErrors(400, "Document was not created");
  }
  return res
    .status(200)
    .json(
      new ApiRes(
        200,
        { data: createAchivement, user: findUser?.fullname },
        "Achivement model created by user successfully"
      )
    );
};

const studentImageController = async (req, res) => {
  try {
    const { topic, description } = req.body;
    if (!topic || !description) {
      throw new ApiErrors(400, "Title must me need");
    }
    const user = await StudentModels.findById(req.user?._id);
    if (!user) {
      throw new ApiErrors(400, "user not found with this id");
    }

    const imagefilepath = req.files?.image[0]?.path;
    console.log("Yeh hai BSDK file path", imagefilepath);

    if (!imagefilepath) {
      throw new ApiErrors(400, "Image Path no found Sorry");
    }

    const image = await uploadOnCloudinary(imagefilepath);
    if (!image) {
      throw new ApiErrors(
        400,
        "Some Error While Uploading a image on Cloudinary"
      );
    }
    const uploadImage = await studentImageModels.create({
      topic: topic,
      description: description,
      image: image.secure_url,
      uploadBy: user?._id,
    });
    if (!uploadImage) {
      throw new ApiErrors(400, "Document was not created");
    }
    return res.status(200).json(
      new ApiRes(
        200,
        {
          data: uploadImage,
          user: user?.fullname,
        },
        "Image model created by user successfully"
      )
    );
  } catch (error) {
    throw new ApiErrors(
      400,
      "Something Errors while run student image controller"
    );
  }
};

const studentComplaintController = async (req, res) => {
  
    const { teacherName, reason, description, className, subject, department } =
      req.body;
    if (
      !teacherName ||
      !reason ||
      !description ||
      !className ||
      !subject ||
      !department
    ) {
      throw new ApiErrors(400, "All Field are required");
    }
    const createComplaint = await studentComplaintModels.create({
      teacherName,
      reason,
      className,
      department,
      description,
      subject,
    });

    if (!createComplaint) {
      throw new ApiErrors(400, "Document was not created some error..");
    }
    return res
      .status(200)
      .json(
        new ApiRes(201, createComplaint, "Complaint register successFully")
      );
};

const studentFeedbackController = async (req, res) => {
  try {
    const { teacherName, text, description } = req.body;
    if (!text || !teacherName) {
      throw new ApiErrors(400, "Text is required");
    }
    const user = await StudentModels.findById(req.user?._id);
    if (!user) {
      throw new ApiErrors(400, "User not found");
    }
    const createFeedback = await studentFeedBackModels.create({
      description,
      teacherName,
      text,
      createdBy: user?._id,
    });
    if (!createFeedback) {
      throw new ApiErrors(400, "Feedback Document was not created");
    }
    return res.status(200).json(
      new ApiRes(
        201,
        {
          data: createFeedback,
          user: user?.fullname,
        },
        "Feedback was sent successFully"
      )
    );
  } catch (error) {
    throw new ApiErrors(400, "Error While Register a feedback controller");
  }
};

export {
  register,
  verifyStudentsEmail,
  verifyViaEmail,
  login,
  logout,
  deactivateAccount,
  updateStudentDetailsOnDB,
  changeAvatar,
  changeEmail,
  changePassword,
  forgotPassword,
  verifyOtpEmail,
  studentAchivementController,
  studentComplaintController,
  studentFeedbackController,
  studentImageController,
};
