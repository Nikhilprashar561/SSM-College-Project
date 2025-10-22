import jwt from "jsonwebtoken";
import { ApiErrors } from "./ApiError.js";
import dotenv from "dotenv"

dotenv.config()

const generateAccessToken = async (payload) => {
  try {
    if (!payload) {
      throw new ApiErrors(400, "User Data Cannot Get");
    }
    const accessToken = await jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });

    return accessToken;
  } catch (error) {
    throw new ApiErrors(400, "Some Error While Access Token");
  }
};

export { generateAccessToken };
