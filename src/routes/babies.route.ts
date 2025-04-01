import express from 'express';
import { createBaby, createFeed, createHealthLog, createPumpSession, deleteBaby, deleteFeed, deleteHealthLog, deletePumpSession, getBabies, getBaby, getFeeds, getHealthLogs, getPumpSessions, updateBaby, updateFeed, updateHealthLog, updatePumpSession } from '../controllers/baby.controller';

const router = express.Router();

router.post('/create-baby/:userId',createBaby)
router.get("/get-babies/:userId", getBabies)
router.get("/:id", getBaby)
router.put("/:id", updateBaby)
router.delete("/:id", deleteBaby)
router.post("/:babyId/feed", createFeed)
router.get("/:babyId/feed", getFeeds)
router.put("/:babyId/feed/:feedId", updateFeed)
router.delete("/:babyId/feed/:feedId", deleteFeed)
router.post("/:babyId/pump-session", createPumpSession)
router.get("/:babyId/pump-session", getPumpSessions)
router.put("/:babyId/pump-session/:pumpSessionId", updatePumpSession)
router.delete("/:babyId/pump-session/:pumpSessionId", deletePumpSession)
router.post("/:babyId/health-log", createHealthLog)
router.get("/:babyId/health-log", getHealthLogs)
router.put("/:babyId/health-log/:healthLogId", updateHealthLog)
router.delete("/:babyId/health-log/:healthLogId", deleteHealthLog)


export const babiesRouter = router;