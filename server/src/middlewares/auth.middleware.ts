import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(
  //@ts-ignore
  async (req: Request, _: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        throw new ApiError(401, "Unauthorized request!!");
      }
      //@ts-ignore
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      //@ts-ignore
      const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );
      if (!user) {
        throw new ApiError(401, "Invalid Access Token!!");
      }
      //@ts-ignore
      req.user = user;
      next();
    } catch (error) {
      //@ts-ignore
      throw new ApiError(401, error?.message || "Invalid Access Token!!");
    }
  }
);
