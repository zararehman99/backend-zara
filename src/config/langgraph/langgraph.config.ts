import dotenv from "dotenv";
dotenv.config();

export const LANGGRAPH_CONFIG = {
    langsmithUrl: process.env.LANGSMITH_URL || "",
    langsmithApiKey: process.env.LANGSMITH_API_KEY || "",
    langsmithAssistant: process.env.LANGSMITH_ASSISTANT
};
