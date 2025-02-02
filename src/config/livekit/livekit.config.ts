import dotenv from "dotenv";
dotenv.config();

export const LIVEKIT_CONFIG = {
  API_KEY: process.env.LIVEKIT_API_KEY || "",
  API_SECRET: process.env.LIVEKIT_API_SECRET || "",
  URL: process.env.LIVEKIT_URL || "",
};
