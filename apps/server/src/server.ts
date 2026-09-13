import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { errorHandler } from "./middlewares/errorHandler";
import { authRoutes } from "./modules/auth/auth.routes";
import { mediaRouter } from "./modules/media/media.routes";
import { diaryRouter } from "./modules/diary/diary.routes";
import { gatewayController } from "./modules/gateway/gateway.controller";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Public Health Check Endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

const openApiDocument = YAML.load(path.join(__dirname, "docs/openapi.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", mediaRouter);
app.use("/api/v1", diaryRouter);
app.post("/api/gateway", gatewayController);

// Centralized Global Error Handler Middleware (MUST be placed after all routes)
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export { app };
