import { Request, Response } from "express";
import LanggraphService from "../services/langgraph/langgraph.service";

export const getAssistant = async (req: Request, res: Response) => {
    try {
        const { assistantId } = req.params;
        const assistant = await LanggraphService.getAssistant(assistantId);
        res.status(200).json(assistant);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get assistant' });
    }
};


export const createThread = async (req: Request, res: Response) => {
    try {
        const thread = await LanggraphService.createThread();
        res.status(200).json(thread);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create thread' });
    }
};

export const createRun = async (req: Request, res: Response) => {
    try {
        const { threadId, assistantId, input } = req.body;
        const run = await LanggraphService.createRun(threadId, assistantId, input);
        res.status(200).json(run);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create run' });
    }
};

export const getRun = async (req: Request, res: Response) => {
    try {
        const { threadId, runId } = req.params;
        const run = await LanggraphService.getRun(threadId, runId);
        res.status(200).json(run);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get run' });
    }
};

export const joinRun = async (req: Request, res: Response) => {
    try {
        const { threadId, runId } = req.params;
        const run = await LanggraphService.joinRun(threadId, runId);
        res.status(200).json(run);
    } catch (error) {
        res.status(500).json({ error: 'Failed to join run' });
    }
};

export const cancelRun = async (req: Request, res: Response) => {
    try {
        const { threadId, runId } = req.params;
        const run = await LanggraphService.cancelRun(threadId, runId);
        res.status(200).json(run);
    } catch (error) {
        res.status(500).json({ error: 'Failed to cancel run' });
    }
};

export const streamRun = async (req: Request, res: Response) => {
    try {
        const { threadId } = req.params;
        const { assistant_id, input } = req.body;

        // Get the stream from the service
        const stream = await LanggraphService.streamRun(threadId, assistant_id, input);

        // Set headers for streaming
        res.setHeader('Content-Type', 'application/octet-stream');

        // Pipe the stream directly to response
        stream.pipe(res);

        // Handle stream completion
        stream.on('end', () => {
            res.end();
        });

        // Handle stream errors
        stream.on('error', (error:any) => {
            console.error('Stream error:', error);

            if (!res.headersSent) {
                // If no data was sent yet, send a JSON error response
                res.status(500).json({ error: 'Stream failed' });
            } else {
                // If data was already sent, write an error message in the stream
                res.write('\n{"error": "Stream failed"}\n');
                res.end();
            }
        });

    } catch (error) {
        console.error('Stream setup error:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Failed to setup stream' });
        } else {
            res.write('\n{"error": "Stream failed"}\n');
            res.end();
        }
    }
};