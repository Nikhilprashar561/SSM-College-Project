import bcrypt from "bcrypt";
import { ApiErrors } from "./ApiError.js";

const passwordHashing = async (password) => {
  if (!password) {
    throw new ApiErrors(400, "Password is Required");
  }

  const hashPassword = bcrypt.hash(password, 10);

  return hashPassword
};

export { passwordHashing };
