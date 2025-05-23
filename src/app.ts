import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import dotenv from "dotenv";
import { userRouter } from "./routes/user.route";
import { authRouter } from "./routes/auth.route";
import { babiesRouter } from "./routes/babies.route";
import { langgraphRouter } from "./routes/langgraph.route";
import livekitRoutes from "./routes/livekit.route";

dotenv.config();

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:8081", "https://front-end-flax-zeta.vercel.app", "https://la-latch-club.vercel.app"],
  credentials: true,
};

app.use(cors(corsOptions));
//For Content-Type of application/json
app.use(express.json());
//For Content-Type of application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());

app.use("/api/users", userRouter);
app.use("/api/babies", babiesRouter);
app.use("/api/auth", authRouter);
app.use("/api/livekit", livekitRoutes);
app.use("/api/langgraph", langgraphRouter);

export default app;
