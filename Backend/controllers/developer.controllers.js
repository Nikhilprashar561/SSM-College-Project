import { ApiErrors } from "../utils/ApiError.js";
import { passwordHashing } from "../utils/bcrypt.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiRes } from "../utils/ApiRes.js";
import { developerModels } from "../models/HelpModels/developer.models.js";
import { SendEmail } from "../config/resend.js";
import { verifyEmailTemplate } from "../utils/verifyEmailTemplate.js";
import { isPasswordCorrect } from "../utils/isPasswordCorrect.js";
import { generateAccessToken } from "../utils/AccessJWT.js";
import { generateRefreshToken } from "../utils/RefreshJWT.js";
import { SendTransPort } from "../config/nodemailer.js";
import { verifyOtpEmailTemplate } from "../utils/verifyOtpEmailTemplate.js";

const register = async (req, res) => {
  const {
    name,
    email,
    mobile_no,
    password,
    verifyCode,
    designation,
    description,
  } = req.body;

  const checkData = await developerModels.countDocuments();

  if (checkData >= 1) {
    throw new ApiErrors(400, "Developer Account is Already Created");
  }

  const existing = await developerModels.findOne({ email });

  if (existing) {
    throw new ApiErrors(400, "With this email user already register");
  }

  if (!name || !email || !password || !verifyCode) {
    throw new ApiErrors(400, "All Fields Are Required");
  }

  let uniqueCode = 2005;

  if (parseInt(verifyCode) !== uniqueCode) {
    throw new ApiErrors(400, "You Are Not a developer . Invalid Code");
  }

  const hashPassword = await passwordHashing(password);

  if (!hashPassword) {
    throw new ApiErrors(400, "Password was not hashed");
  }

  const avatarLocalFilePath = req.files?.avatar[0]?.path;

  if (!avatarLocalFilePath) {
    throw new ApiErrors(400, "Image Not Found");
  }

  const avatar = await uploadOnCloudinary(avatarLocalFilePath);

  if (!avatar) {
    throw new ApiErrors(400, "Image Was Not Uploaded");
  }

  const token = Math.floor(1000 + Math.random() * 9000);
  const now = new Date();

  const expiryTime = new Date(now.getTime() + 30 * 60 * 1000);

  const verifyUrl = `${process.env.FRONTEND_URL}/api/developer/verify-email/code/${token}`;

  // console.log(`Yeh hai Verify Url ${verifyUrl}`);

  const verifyEmail = await SendEmail({
    sendTO: email,
    subject: `Verifying ${name} ${designation} via Email Address`,
    html: verifyEmailTemplate({
      name,
      url: verifyUrl,
    }),
  });

  Promise.resolve(verifyEmail).catch((err) => {
    throw new ApiErrors(400, "Promise Not Resolve");
  });

  const createDeveloper = await developerModels.create({
    name,
    email,
    mobile_no,
    password: hashPassword,
    verifyCode,
    designation,
    description,
    avatar: avatar.secure_url,
    token: token,
    tokenExpiry: expiryTime,
  });

  if (!createDeveloper) {
    throw new ApiErrors(400, "Some Error While Create Account");
  }

  return res
    .status(200)
    .json(new ApiRes(200, createDeveloper, "Developer Register SuccessFully"));
};

const verifyDeveloper = async (req, res) => {
  // Here We are Verifying a developer via these register email
  const { unique } = req.params;

  const validateToken = await developerModels.findOne({});

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
  // await validateToken.save({ validateBeforeSave: true });

  return res
    .status(200)
    .json(
      new ApiRes(200, validateToken, "Developer Email Verify Successfully")
    );
};

const verifyViaEmail = async (req, res) => {
  // These Case Use When User is Forgot to verify email regesiter time then he has only one last option with there register they verify there self
  const { email } = req.body;

  if (!email) {
    throw new ApiErrors(400, "Email is required");
  }

  const checkEmail = await developerModels.findOne({ email });

  if (!checkEmail) {
    throw new ApiErrors(400, "Email not found");
  }

  const randomVal = Math.floor(1000 + Math.random() * 9000);
  const now = new Date();
  const expiryTime = new Date(now.getTime() + 30 * 60 * 1000);

  const verifyUrl = `${process.env.FRONTEND_URL}/api/developer/verify-email/code/${randomVal}`;

  const verifyEmail = await SendEmail({
    sendTO: email,
    subject: `Verifying  ${checkEmail.name} via Email Address`,
    html: verifyEmailTemplate({
      name: checkEmail.name,
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

  const checkUser = await developerModels.findOne({ email });

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
    name: checkUser.name,
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
  const find = await developerModels.findById(req?.user);

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
  const user = await developerModels.findByIdAndDelete(req.user?._id);

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
    .json(new ApiRes(200, "Developer Account delete successfully"));
};

const updateDeveloperDetailsOnDB = async (req, res) => {
  const { name, mobile_no, designation, description, verifyId } = req.body;

  const user = await developerModels.findByIdAndUpdate(
    req.user?._id,
    { name, mobile_no, description, designation, verifyId },
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
  const avatarLocalFilePath = req.files?.avatar[0]?.path;

  if (!avatarLocalFilePath) {
    throw new ApiErrors(400, "Avatar file path not found");
  }

  const avatar = await uploadOnCloudinary(avatarLocalFilePath);

  if (!avatar) {
    throw new ApiErrors(400, "Avatar Image Was Not Uploaded");
  }

  const user = await developerModels.findByIdAndUpdate(
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

  const user = await developerModels.findByIdAndUpdate(req.user?._id, {
    password,
  });

  if (!user) {
    throw new ApiErrors(400, "Some Error While Change Password");
  }

  return res
    .status(200)
    .json(new ApiRes(200, user, "Password Change SuccessFully"));
};

const changeEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiErrors(400, "Email is Required");
  }
  const user = await developerModels.findById(req.user?._id);

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

  const verifyUrl = `${process.env.FRONTEND_URL}/api/developer/verify-email/code/${token}`;

  const verifyEmail = await SendTransPort({
    sendTom: email,
    Subject: `Verifying ${user.name} new email`,
    html: verifyEmailTemplate({
      name: user?.name,
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

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiErrors(400, "Email is Required");
  }
  const checkUser = await developerModels.findOne({ email });

  if (!checkUser) {
    throw new ApiErrors(400, "User not found with this email");
  }
  const now = new Date();
  const expiryTime = new Date(now.getTime() + 30 * 60 * 1000);
  const otp = Math.floor(1000 + Math.random() * 9000);

  checkUser.verifyOtp = otp;
  checkUser.OtpExpiry = expiryTime;
  await checkUser.save();

  const desc = `Hi ${checkUser.name} verify your otp`;
  const org = `Welcome to SSM College Dinanagar`;

  const verifyEMail = await SendTransPort({
    sendTom: email,
    Subject: `Verify ${checkUser.name} OTP`,
    html: verifyOtpEmailTemplate({
      name: checkUser.name,
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
  const checkData = await developerModels.findOne({ email });

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
  await checkData.save()

  return res
    .status(200)
    .json(new ApiRes(200, checkData, "User Verified SuccessFully"));
};

export {
  register,
  verifyDeveloper,
  verifyViaEmail,
  login,
  logout,
  deactivateAccount,
  updateDeveloperDetailsOnDB,
  changeAvatar,
  changePassword,
  changeEmail,
  forgotPassword,
  verifyOtpEmail,
};