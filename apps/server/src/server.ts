import express, { type Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";
import { authRoutes } from "./modules/auth/auth.routes";

dotenv.config();

export const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      status: "ok",
      service: "plot-farm-server",
      message: "Server ready for module implementations.",
    },
  });
});

// Register routes here...
app.use("/api/auth", authRoutes);

// Centralized Global Error Handler Middleware (MUST be placed after all routes)
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

