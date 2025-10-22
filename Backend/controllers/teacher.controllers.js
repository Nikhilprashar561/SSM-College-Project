import { TeacherModels } from "../models/TeacherModels/teacher.models.js";
import { ApiErrors } from "../utils/ApiError.js";
import { passwordHashing } from "../utils/bcrypt.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiRes } from "../utils/ApiRes.js";
import { SendTransPort } from "../config/nodemailer.js";
import { verifyEmailTemplate } from "../utils/verifyEmailTemplate.js";
import { isPasswordCorrect } from "../utils/isPasswordCorrect.js";
import { generateAccessToken } from "../utils/AccessJWT.js";
import { generateRefreshToken } from "../utils/RefreshJWT.js";
import { verifyOtpEmailTemplate } from "../utils/verifyOtpEmailTemplate.js";

const TeacherRegister = async (req, res) => {
  const {
    department,
    firstname,
    lastname,
    email,
    password,
    mobile_no,
    qualification,
    designation,
    gender,
  } = req.body;

  if (!department || !email || !firstname) {
    throw new ApiErrors(400, "All Fields are required");
  }

  const existingTeacher = await TeacherModels.findOne({
    $or: [{ email }, { mobile_no }],
  });

  if (existingTeacher) {
    throw new ApiErrors(
      400,
      "Sorry to Say But With this Credentials Teacher Already Register"
    );
  }

  const hashPassword = await passwordHashing(password);

  const avatarLocalFilePath = req.files?.avatar[0]?.path;

  if (!avatarLocalFilePath) {
    throw new ApiErrors(400, "Image Not Found");
  }

  const avatar = await uploadOnCloudinary(avatarLocalFilePath);

  if (!avatar) {
    throw new ApiErrors(400, "Image was Not Upload");
  }

  const token = Math.floor(1000 + Math.random() * 9000);
  const now = new Date();

  const expiryTime = new Date(now.getTime() + 30 * 60 * 1000);

  const verifyUrl = `${process.env.FRONTEND_URL}/api/developer/verify-email/code/${token}`;

  const verifyEmail = await SendTransPort({
    sendTom: email,
    Subject: `Verifying ${firstname} via Email address`,
    html: verifyEmailTemplate({
      name: `${firstname} ${lastname}`,
      url: verifyUrl,
    }),
  });

  const createTeacher = await TeacherModels.create({
    firstname,
    department,
    lastname,
    email,
    password: hashPassword,
    mobile_no,
    qualification,
    designation,
    gender,
    avatar: avatar.secure_url,
    token: token,
    tokenExpiry: expiryTime,
  });

  if (!createTeacher) {
    throw new ApiErrors(400, "Error While Register a teacher");
  }

  return res
    .status(200)
    .json(new ApiRes(201, createTeacher, "Teaher Register SuccessFully"));
};

const verifyTeacherEmail = async (req, res) => {
  const { unique } = req.params;
  
    if (!unique) {
      throw new ApiErrors(400, "Token not found in URL");
    }
  
    const validateToken = await TeacherModels.findOne({ token: unique });
  
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
      .json(new ApiRes(200, validateToken, "Teacher Email Verify Successfully"));
};

const verifyViaEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiErrors(400, "Email is required");
  }

  const checkEmail = await TeacherModels.findOne({ email });

  if (!checkEmail) {
    throw new ApiErrors(400, "Email not found");
  }

  if (checkEmail.isVerify === true) {
    checkEmail.token = null;
    checkEmail.tokenExpiry = null;
    throw new ApiErrors(400, "Your Email is already verify");
  }

  const randomVal = Math.floor(1000 + Math.random() * 9000);
  const now = new Date();
  const expiryTime = new Date(now.getTime() + 30 * 60 * 1000);

  const verifyUrl = `${process.env.FRONTEND_URL}/api/teacher/verify-email/code/${randomVal}`;

  const verifyEmail = await SendTransPort({
    sendTom: email,
    Subject: `Verifying  ${checkEmail.firstname} via Email Address`,
    html: verifyEmailTemplate({
      name: checkEmail.firstname,
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
  
    const checkUser = await TeacherModels.findOne({ email });
  
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
      name: checkUser.firstname,
      email: checkUser.email,
      designation: checkUser.designation,
      role: checkUser.role,
    };
  
    const refreshPayload = {
      _id: checkUser._id,
    };
  
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
  const find = await TeacherModels.findById(req?.user);
  
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
      .json(new ApiRes(201, find, "User Logout SuccessFully"));
};

const deactivateAccount = async (req, res) => {
  const user = await TeacherModels.findByIdAndDelete(req.user?._id);

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
    .json(new ApiRes(200, "Teacher Your Account delete successfully"));
};

const updateTeacherDetailsOnDB = async (req, res) => {
  const {
      firstname,
      lastname,
      mobile_no,
      designation,
      qualifications,
      gender,
      verifyID,
    } = req.body;
  
    const user = await TeacherModels.findByIdAndUpdate(
      req.user?._id,
      {
        firstname,
        lastname,
        mobile_no,
        qualifications,
        gender,
        designation,
        verifyID,
      },
      { new: true }
    );
  
    if (!user) {
      throw new ApiErrors(400, "Some Error While Update User Details");
    }
  
    await user.save();
  
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
  
    const user = await TeacherModels.findByIdAndUpdate(
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
    const user = await TeacherModels.findById(req.user?._id);
  
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
  
    const verifyUrl = `${process.env.FRONTEND_URL}/api/teacher/verify-email/code/${token}`;
  
    const verifyEmail = await SendTransPort({
      sendTom: email,
      Subject: `Verifying ${user.firstname} new email`,
      html: verifyEmailTemplate({
        name: user?.firstname,
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
  
    const user = await TeacherModels.findByIdAndUpdate(req.user?._id, {
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
    const checkUser = await TeacherModels.findOne({ email });
  
    if (!checkUser) {
      throw new ApiErrors(400, "User not found with this email");
    }
    const now = new Date();
    const expiryTime = new Date(now.getTime() + 30 * 60 * 1000);
    const otp = Math.floor(1000 + Math.random() * 9000);
  
    checkUser.verifyOtp = otp;
    checkUser.OtpExpiry = expiryTime;
    await checkUser.save();
  
    const desc = `Hi ${checkUser.firstname} verify your otp`;
    const org = `Welcome to SSM College Dinanagar`;
  
    const verifyEMail = await SendTransPort({
      sendTom: email,
      Subject: `Verify ${checkUser.firstname} OTP`,
      html: verifyOtpEmailTemplate({
        name: checkUser.firstname,
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
  const checkData = await TeacherModels.findOne({ email });

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
  TeacherRegister,
  verifyTeacherEmail,
  verifyViaEmail,
  login,
  logout,
  deactivateAccount,
  updateTeacherDetailsOnDB,
  changeAvatar,
  changeEmail,
  changePassword,
  forgotPassword,
  verifyOtpEmail,
};
