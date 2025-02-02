import { Request } from "express";
import { IUserAttributes } from "../interfaces/user.interface";

export interface IRegisterRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
  language?: string;
}

export interface ILoginRequestBody {
  email: string;
  password: string;
}

export interface IRefreshTokenRequestBody {
  id: number;
  email: string;
  refreshToken: string;
}

export interface IUserRequest extends Request {
  user?: IUserAttributes;
}