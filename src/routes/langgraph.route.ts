import express from "express";
import {
    getAssistant,
    createThread,
    createRun,
    getRun,
    joinRun,
    cancelRun,
    streamRun
} from "../controllers/langgraph.controller";

const router = express.Router();

router.get('/assistants/:assistantId', getAssistant);
router.post('/threads', createThread);
router.post('/runs', createRun);
router.get('/threads/:threadId/runs/:runId', getRun);
router.get('/threads/:threadId/runs/:runId/join', joinRun);
router.post('/threads/:threadId/runs/:runId/cancel', cancelRun);
router.post('/threads/:threadId/runs/stream', streamRun);

export const langgraphRouter = router;