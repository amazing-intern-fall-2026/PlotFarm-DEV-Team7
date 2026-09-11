import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { modulesRouter } from "./modules";
import { errorHandler } from "./common/middlewares";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", service: "plot-farm-server" });
});

// Mount modular router under /api/v1
app.use("/api/v1", modulesRouter);

// Global centralized error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
