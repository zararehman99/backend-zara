import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { register, login, currentUser, editUserThreadId } from "../controllers/user.controller";
  
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/currentUser", authMiddleware, currentUser);
router.patch("/editUserThreadId", authMiddleware, editUserThreadId);

export const userRouter = router;