import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { errorHandler } from "./middlewares/errorHandler";
import { authRoutes } from "./modules/auth/auth.routes";
import { plotsRouter } from "./modules/plots/plots.routes";
import { careRouter } from "./modules/care/care.routes";
import { mediaRouter } from "./modules/media/media.routes";
import { diaryRouter } from "./modules/diary/diary.routes";
import { AuthController, login } from "./modules/auth/auth.controller";

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
app.use("/api/v1", plotsRouter);
app.use("/api/v1", authRoutes);
app.use("/api/v1", careRouter);
app.use("/api/v1", mediaRouter);
app.use("/api/v1", diaryRouter);
app.post("/api/gateway", (req: Request, res: Response, next: NextFunction) => {
  const action = req.body?.action;
  if (action === "auth.register") {
    req.body = req.body?.payload ?? req.body;
    return AuthController.register(req, res, next);
  }
  return login(req, res, next);
});


// Centralized Global Error Handler Middleware (MUST be placed after all routes)
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export { app };
