import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import {
  getConnectionDetails,
  getCustomConnectionDetails,
} from "../controllers/livekit.controller";

const router = express.Router();

router.get("/connection-details", authMiddleware, getConnectionDetails);
router.post("/connection-details", authMiddleware, getCustomConnectionDetails);

export default router;
