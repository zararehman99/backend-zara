import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { register, login, currentUser, editUserThreadId } from "../controllers/user.controller";
import { createInventory, getInventory, updateInventory, deleteInventory } from "../controllers/user.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/currentUser", authMiddleware, currentUser);
router.patch("/editUserThreadId", authMiddleware, editUserThreadId);

router.post("/inventory/add/:userId", createInventory );
router.get("/inventory/get/:userId", getInventory );
router.put("/inventory/update/:inventoryId", updateInventory );
router.delete("/inventory/delete/:inventoryId", deleteInventory );
export const userRouter = router;