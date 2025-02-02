import {
    AccessToken,
    AccessTokenOptions,
    VideoGrant,
  } from "livekit-server-sdk";
  import { LIVEKIT_CONFIG } from "../../config/livekit/livekit.config";
  
  export async function createAccessToken(
    userInfo: AccessTokenOptions,
    roomName: string,
    language?: string,
    customGreeting?: string,
    gender?: string,
    participantType?: string,
    voiceType?: string,
    ageGroup?: string,
    username?: string
  ): Promise<string> {
    const { API_KEY, API_SECRET } = LIVEKIT_CONFIG;
  
    const token = new AccessToken(API_KEY, API_SECRET, {
      ...userInfo,
      ttl: "15m",
    });
  
    const grant: VideoGrant = {
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canPublishData: true,
      canSubscribe: true,
    };
    token.addGrant(grant);
  
    token.metadata = JSON.stringify({
      participantName: userInfo.identity,
      language: language || "en",
      gender: gender || 'male',
      customGreeting: customGreeting,
      participantType: participantType || "participant", // or "moderator"
      voiceType: voiceType || 'default',
      ageGroup: ageGroup || 'young',
      username: username || 'UserName',
    });
    
  
    return await token.toJwt();
  }
  