import jwt from "jsonwebtoken";
import { ApiErrors } from "../utils/ApiError.js";
import { developerModels } from "../models/HelpModels/developer.models.js";
import { HodModels } from "../models/HodModels/hod.models.js";
import { TeacherModels } from "../models/TeacherModels/teacher.models.js";
import { PrincipalModels } from "../models/PrincipalModels/principal.models.js";
import { StudentModels } from "../models/StudentModels/students.models.js";

const auth = async (req, res, next) => {
  try {
    const token =
      req?.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiErrors(400, "User Token not found, Invaild Request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET_KEY);

    let user;

    switch (decodedToken.role) {
      case "developer":
        user = await developerModels.findById(decodedToken?._id);
        break;
      case "hod":
        user = await HodModels.findById(decodedToken?._id);
        break;
      case "teacher":
        user = await TeacherModels.findById(decodedToken?._id);
        break;
      case "principal":
        user = await PrincipalModels.findById(decodedToken?._id);
        break;
      case "student":
        user = await StudentModels.findById(decodedToken?._id);
        break;
      default:
        throw new ApiErrors(400, "User Not Found by token");
    }

    if(!user){
        throw new ApiErrors(400, "User Not Found")
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiErrors(
      400,
      "Invailid Request, Please Login First then you are able"
    );
  }
};

export { auth };