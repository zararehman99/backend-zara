

import axios, { AxiosInstance } from 'axios';
import crypto from 'crypto';
import { LANGGRAPH_CONFIG } from '../../config/langgraph/langgraph.config';

interface Assistant {
    id: string;
    name: string;
    // Add other assistant properties here
}

interface ThreadResponse {
    thread_id: string;
    // Add other thread response properties here
}

interface RunResponse {
    run_id: string;
    status: string;
    // Add other run response properties here
}

interface InputPayload {
    [key: string]: any;
}

class LanggraphService {
    private baseUrl: string;
    private apiKey: string;
    private axiosInstance: AxiosInstance;

    constructor() {
        this.baseUrl = LANGGRAPH_CONFIG.langsmithUrl;
        this.apiKey = LANGGRAPH_CONFIG.langsmithApiKey;

        this.axiosInstance = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': this.apiKey,
                'Access-Control-Allow-Origin': '*',
            },
        });
    }

    async getAssistant(assistantId: string): Promise<Assistant> {
        try {
            console.log(`Fetching assistant: ${assistantId}`);
            const response = await this.axiosInstance.get<Assistant>(`/assistants/${assistantId}`);
            return response.data;
        } catch (error: any) {
            console.error(`❌ Error fetching assistant ${assistantId}:`, error.response?.data || error.message);
            throw error;
        }
    }

    async createThread(): Promise<ThreadResponse> {
        try {
            console.log('Creating a new thread');
            const threadId = crypto.randomUUID();
            const response = await this.axiosInstance.post<ThreadResponse>('/threads', {
                thread_id: threadId,
                if_exists: 'raise',
            });
            return response.data;
        } catch (error: any) {
            console.error(`Error creating thread: ${error.message}`);
            throw error;
        }
    }

    async createRun(threadId: string, assistantId: string, input: InputPayload): Promise<RunResponse> {
        try {
            console.log(`Creating a run for thread ${threadId}`);
            const response = await this.axiosInstance.post<RunResponse>(
                `/threads/${threadId}/runs`,
                {
                    assistant_id: assistantId,
                    input,
                    stream_mode: ['messages'],
                }
            );
            return response.data;
        } catch (error: any) {
            console.error(`Error creating run for thread ${threadId}:`, error.response?.data || error.message);
            throw error;
        }
    }

    async joinRun(threadId: string, runId: string): Promise<RunResponse> {
        try {
            console.log(`Joining run ${runId} for thread ${threadId}`);
            const response = await this.axiosInstance.get<RunResponse>(`/threads/${threadId}/runs/${runId}/join`);
            return response.data;
        } catch (error: any) {
            console.error(`Error joining run ${runId}:`, error.response?.data || error.message);
            throw error;
        }
    }

    async getRun(threadId: string, runId: string): Promise<RunResponse> {
        try {
            console.log(`Getting run ${runId} for thread ${threadId}`);
            const response = await this.axiosInstance.get<RunResponse>(`/threads/${threadId}/runs/${runId}`);
            return response.data;
        } catch (error: any) {
            console.error(`Error getting run ${runId}:`, error.response?.data || error.message);
            throw error;
        }
    }

    async cancelRun(threadId: string, runId: string): Promise<RunResponse> {
        try {
            console.log(`Cancelling run ${runId} for thread ${threadId}`);
            const response = await this.axiosInstance.post<RunResponse>(
                `/threads/${threadId}/runs/${runId}/cancel`,
                {}
            );
            return response.data;
        } catch (error: any) {
            console.error(`❌ Error cancelling run ${runId}:`, error.response?.data || error.message);
            throw error;
        }
    }

    async streamRun(threadId: string, assistantId: string, input: InputPayload): Promise<NodeJS.ReadableStream> {
        try {
            console.log(`Streaming run for thread ${threadId}`);
            const response = await axios({
                method: 'post',
                url: `${this.baseUrl}/threads/${threadId}/runs/stream`,
                data: {
                    assistant_id: assistantId,
                    input,
                    stream_mode: ['messages'],
                },
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': this.apiKey,
                },
                responseType: 'stream',
            });

            return response.data as NodeJS.ReadableStream;
        } catch (error: any) {
            console.error(`❌ Error streaming run for thread ${threadId}:`, error.response?.data || error.message);
            throw error;
        }
    }
}

export default new LanggraphService();
