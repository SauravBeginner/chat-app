// Import required dependencies and types from Express
import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

// Import User model and cloudinary upload utility
import { User } from "../models/user.model";
import { uploadOnCloudinary } from "../utils/cloudinary";

/**
 * Controller to handle user registration
 * Validates input, checks for existing users, handles file uploads and creates new user
 */
const registerUser: any = asyncHandler(async (req: Request, res: Response) => {
  // Extract user details from request body
  const { fullName, email, userName, password } = req.body;

  // Validate that all required fields are provided
  if (
    [fullName, email, userName, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exists with same email or username
  const existedUser = await User.findOne({ $or: [{ userName }, { email }] });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // Handle file uploads (avatar and cover image)
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  // Get avatar file path and validate
  const avatarLocalPath = files?.avatar[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required!!");
  }

  // Upload avatar to Cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  // Handle optional cover image upload
  let coverImageLocalPath: string;
  let coverImage;
  if (
    files &&
    Array.isArray(files?.coverImage) &&
    files?.coverImage?.length > 0
  ) {
    coverImageLocalPath = files?.coverImage[0]?.path;
    coverImage = await uploadOnCloudinary(coverImageLocalPath);
  }

  // Final avatar validation
  if (!avatar) {
    throw new ApiError(400, "Avatar is required!!");
  }
  // Upload cover image to Cloudinary

  // Create new user in database
  const user = await User.create({
    fullName,
    avatar: avatar?.url,
    coverImage: coverImage?.url || "",
    userName: userName.toLowerCase(),
    email,
    password,
  });

  // Fetch created user (excluding sensitive fields)
  const createdUser = await User.findById(user?._id).select(
    "-password -refreshToken"
  );

  // Validate user creation
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating User!!");
  }

  // Log created user and send success response
  console.log(createdUser);
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User created Successfully!!"));
});

export { registerUser };
