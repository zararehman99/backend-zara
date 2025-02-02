import { UUID } from "crypto";

export interface IUserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  language: string;
  refreshToken: string | null;
  threadId: UUID | null;
}

export interface IUserCreationAttributes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
  language?: string;
  refreshToken?: string | null;
  threadId?: UUID | null;
}

export interface IUserMethods {
  generateToken(): string;
  generateRefreshToken(): string;
  validatePassword(password: string): Promise<boolean>;
}