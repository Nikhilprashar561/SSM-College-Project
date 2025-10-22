import jwt from "jsonwebtoken";
import { ApiErrors } from "./ApiError.js";
import dotenv from "dotenv"

dotenv.config()

const generateRefreshToken = async (refreshPayload) => {
  try {
    if (!refreshPayload) {
      throw new ApiErrors(400, "Refresh Token _id not get");
    }
    const generateRefreshToken = await jwt.sign(
      refreshPayload,
      process.env.REFRESH_SECRET_KEY,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
    return generateRefreshToken;
  } catch (error) {
    throw new ApiErrors(400, "Some Error While Generate Access Token");
  }
};

export { generateRefreshToken }