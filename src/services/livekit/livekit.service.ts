import { createAccessToken } from "./livekit-token.service";
import { ConnectionDetails } from "../../interfaces/connection-details.interface";
import { LIVEKIT_CONFIG } from "../../config/livekit/livekit.config";

export class LiveKitService {
  static async generateConnectionDetails(
    language?: string,
    customGreeting?: string,
    gender?: string,
    participantType?: string,
    voiceType?: string,
    ageGroup?: string,
    username?: string
  ): Promise<ConnectionDetails> {
    if (
      !LIVEKIT_CONFIG.URL ||
      !LIVEKIT_CONFIG.API_KEY ||
      !LIVEKIT_CONFIG.API_SECRET
    ) {
      throw new Error("LiveKit configuration is not properly set.");
    }

    const participantIdentity = `voice_assistant_user_${Math.floor(
      Math.random() * 10_000
    )}`;
    const roomName = `voice_assistant_room_${Math.floor(
      Math.random() * 10_000
    )}`;

    const participantToken = await createAccessToken(
      { identity: participantIdentity },
      roomName,
      language,
      customGreeting,
      gender,
      participantType,
      voiceType,
      ageGroup,
      username,
    );

    return {
      serverUrl: LIVEKIT_CONFIG.URL,
      roomName,
      participantName: participantIdentity,
      participantToken,
    };
  }
}
