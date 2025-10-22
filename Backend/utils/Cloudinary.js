import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv"

dotenv.config({
  path: './.env'
})

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

//console.log(process.env.CLOUDINARY_CLOUD_API_SECRET)

const uploadOnCloudinary = async (imagePath) => {
  try {
    if (!imagePath) return null;

   // console.log("path aya ya nahi", imagePath);

    const response = await cloudinary.uploader.upload(imagePath, {
      resource_type: "auto"
    });

    fs.unlinkSync(imagePath);
    return response;
  } catch (error) {
    fs.unlinkSync(imagePath);
    return null;
  }
};

export { uploadOnCloudinary };
