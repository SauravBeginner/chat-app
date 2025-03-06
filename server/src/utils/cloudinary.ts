import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dmt8wtvzl",
  api_key: process.env.CLOUDINARY_API_KEY || "652847893676986",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "Bl49IULfkY8345V09vkxtns3sZ8",
});

const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfull
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    console.log("Error while uploading file on cloudinary", error);
    return null;
  }
};

export { uploadOnCloudinary };
