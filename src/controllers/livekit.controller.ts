import { Request, Response } from "express";
import { LiveKitService } from "../services/livekit/livekit.service";
import { handleError } from "../utils/error-handler/error-handler.util";

export const getConnectionDetails = async (req: Request, res: Response) => {
  try {
    const connectionDetails = await LiveKitService.generateConnectionDetails();
    res.json(connectionDetails);
  } catch (error) {
    handleError(res, error);
  }
};

export const getCustomConnectionDetails = async (
  req: Request,
  res: Response
) => {
  try {

    const { language, customGreeting, gender, participantType, voiceType, ageGroup, username } = req.body;
    
    const connectionDetails =
      await LiveKitService.generateConnectionDetails(
        language,
        customGreeting,
        gender,
        participantType,
        voiceType,
        ageGroup,
        username
      );
    res.json(connectionDetails);
  } catch (error) {
    handleError(res, error);
  }
};
