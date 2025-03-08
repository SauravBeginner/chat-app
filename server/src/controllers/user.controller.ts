// Import required dependencies and types from Express
import { request, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

// Import User model and cloudinary upload utility
import { User } from "../models/user.model";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { AuthRequest } from "../types";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const options = {
  httpOnly: true,
  secure: true,
};

const generateAccessTokenRefreshToken = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token!!"
    );
  }
};

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
  //   const avatarLocalPath = files?.avatar[0]?.path;

  //   if (!avatarLocalPath) {
  //     throw new ApiError(400, "Avatar file is required!!");
  //   }

  // Upload avatar to Cloudinary
  let avatarLocalPath: string;
  let avatar;

  if (files && Array.isArray(files?.avatar) && files?.avatar?.length > 0) {
    avatarLocalPath = files?.avatar[0]?.path;
    // Upload cover image to Cloudinary
    avatar = await uploadOnCloudinary(avatarLocalPath);
  }
  // Handle optional cover image upload
  let coverImageLocalPath: string;
  let coverImage;

  if (
    files &&
    Array.isArray(files?.coverImage) &&
    files?.coverImage?.length > 0
  ) {
    coverImageLocalPath = files?.coverImage[0]?.path;
    // Upload cover image to Cloudinary
    coverImage = await uploadOnCloudinary(coverImageLocalPath);
  }

  // Final avatar validation
  //   if (!avatar) {
  //     throw new ApiError(400, "Avatar is required!!");
  //   }

  // Create new user in database
  const user = await User.create({
    fullName,
    avatar: avatar?.url || "",
    coverImage: coverImage?.url || "",
    userName: userName.toLowerCase(),
    email,
    password,
  });

  const { accessToken, refreshToken } = await generateAccessTokenRefreshToken(
    user._id
  );
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
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: createdUser, accessToken, refreshToken },
        "User created Successfully!!"
      )
    );
});

// login controller
const loginUser: any = asyncHandler(async (req: Request, res: Response) => {
  // get data from req.body
  const { email, userName, password } = req.body;

  if (!(email || userName)) {
    throw new ApiError(400, "userName or email is required");
  }
  const user = await User.findOne({
    $or: [{ userName }, { email }],
  });
  if (!user) {
    throw new ApiError(404, "User does not exist!");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  console.log("isPasswordValid", isPasswordValid);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid User Credentials!");
  }
  //   console.log("user", user);

  const { accessToken, refreshToken } = await generateAccessTokenRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  console.log("user", loggedInUser);
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged In Successfully!!"
      )
    );
});

const logoutUser = async (req: AuthRequest, res: Response) => {
  await User.findByIdAndUpdate(req.user?._id, {
    $set: {
      refreshToken: undefined,
    },
  });

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out Successfully!!"));
};

const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request!!");
  }
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken, //@ts-ignore
      process.env.REFRESH_TOKEN_SECRET
    );
    //@ts-ignore
    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid Refresh Token!!");
    }

    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Refresh Token is expired or used!!");
    }

    const { accessToken, refreshToken } = await generateAccessTokenRefreshToken(
      user?._id
    );
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: refreshToken },
          "Access Token Refreshed!!"
        )
      );
  } catch (error: any) {
    //@ts-ignore
    throw new ApiError(401, error?.message || "Invalid Refresh Token!!");
  }
});

const changeCurrentPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!(newPassword === confirmPassword)) {
      throw new ApiError(400, "Password does not match!!");
    }
    // @ts-ignore
    const user = await User.findById(req.user?._id);

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordCorrect) {
      throw new ApiError(400, "Invalid old password!!");
    }
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password changed successfully!!"));
  }
);

const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  return res.status(200).json(
    //@ts-ignore
    new ApiResponse(200, req.user, "Current user fetched successfully!!")
  );
});

const updateAccountDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const { fullName, email } = req.body;
    if (!fullName || !email) {
      throw new ApiError(400, "All fields are required!!");
    }

    const user = await User.findByIdAndUpdate(
      // @ts-ignore
      req.user?._id,
      {
        $set: {
          fullName,
          email,
        },
      },
      { new: true }
    ).select("-password");
    return res
      .status(200)
      .json(
        new ApiResponse(200, user, "Account details updated successfully!!")
      );
  }
);

const updateUserAvatar = asyncHandler(async (req: Request, res: Response) => {
  const avatarImageLocalPath = req.file?.path;
  if (!avatarImageLocalPath) {
    throw new ApiError(400, "Avatar file is missing!!");
  }

  const avatar = await uploadOnCloudinary(avatarImageLocalPath);

  if (!avatar?.url) {
    throw new ApiError(400, "API Error while uploading Avatar Image!!");
  }
  const user = await User.findByIdAndUpdate(
    // @ts-ignore
    req.user?._id,
    {
      $set: {
        avatar: avatar?.url,
      },
    },
    { new: true }
  ).select("-password");

  return res.status(200).json(new ApiResponse(200, user, "Avatar updated!!"));
});

const updateUserCoverImage = asyncHandler(
  async (req: Request, res: Response) => {
    const coverImageLocalPath = req.file?.path;
    if (!coverImageLocalPath) {
      throw new ApiError(400, "Cover Image file is missing!!");
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!coverImage?.url) {
      throw new ApiError(400, "API Error while uploading cover Image!!");
    }
    const user = await User.findByIdAndUpdate(
      // @ts-ignore
      req.user?._id,
      {
        $set: {
          coverImage: coverImage?.url,
        },
      },
      { new: true }
    ).select("-password");

    return res
      .status(200)
      .json(new ApiResponse(200, user, "Cover Iamge updated!!"));
  }
);

const getUserChannelDetails = async (req: AuthRequest, res: Response) => {
  const { username: userName } = req.params;
  if (!userName?.trim()) {
    throw new ApiError(400, "Username is missing!!");
  }

  const channel = await User.aggregate([
    {
      $match: {
        userName: userName?.toLowerCase(),
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribedTo",
      },
    },
    {
      $addFields: {
        subscriberCount: {
          $size: "$subscribers",
        },
        channelsSubscribedToCount: {
          $size: "$subscribedTo",
        },
        isSubscribed: {
          $cond: {
            $in: [req.user?._id, "$subscribers.subscriber"],
          },
          then: true,
          else: false,
        },
      },
    },
    {
      $project: {
        fullName: 1,
        userName: 1,
        subscriberCount: 1,
        channelsSubscribedToCount: 1,
        isSubscribed: 1,
        avatar: 1,
        coverImage: 1,
        email: 1,
      },
    },
  ]);

  if (!channel?.length) {
    throw new ApiError(404, "Channel does not exist!!");
  }
  console.log(".....Channel......", channel);

  return res
    .status(200)
    .json(
      new ApiResponse(200, channel[0], "User channel fetched successfully!!")
    );
};

const getWatchHistory = async (req: Request, res: Response) => {
  const user = await User.aggregate([
    {
      $match: {
        //@ts-ignore
        _id: new mongoose.Schema.Types.ObjectId(req.user?._id),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "wachHistory",
        foreignField: "_id",
        as: "watchHistory",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  $project: {
                    fullName: 1,
                    userName: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              owner: {
                $first: "$owner",
              },
            },
          },
        ],
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user[0].watchHistory,
        "Watch History fetched successfully!!"
      )
    );
};

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelDetails,
  getWatchHistory,
};
