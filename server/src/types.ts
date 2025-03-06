import { Request } from "express";
import { Document } from "mongoose";

export interface IUser extends Request {
  _id: string;
  email: string;
  userName: string;
  fullname: string;
}
export interface AuthRequest extends IUser {
  user?: IUser;
}
