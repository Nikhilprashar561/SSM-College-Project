import bcrypt from "bcrypt";
import { ApiErrors } from "./ApiError.js";

const isPasswordCorrect = async ({ password, dbPassword }) => {
  if (!password || !dbPassword) {
    throw new ApiErrors(400, "Password is not get in comparing file");
  }
  const passwordCompare = await bcrypt.compare(password, dbPassword);

  if (!passwordCompare) {
    throw new ApiErrors(400, "Password is Wrong");
  }

  return passwordCompare;
};

export { isPasswordCorrect };
