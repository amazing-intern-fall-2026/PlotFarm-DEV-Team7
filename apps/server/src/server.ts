import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { errorHandler } from "./middlewares/errorHandler";
import { authRoutes } from "./modules/auth/auth.routes";
import { plotsRouter } from "./modules/plots/plots.routes";
import { careRouter } from "./modules/care/care.routes";
import { login } from "./modules/auth/auth.controller";

dotenv.config();

const app: Express = express();
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

const openApiDocument = YAML.load(path.join(__dirname, "docs/openapi.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/v1", plotsRouter);
app.use("/api/v1", authRoutes);
app.use("/api/v1", careRouter);
app.post("/api/gateway", login);

// Centralized Global Error Handler Middleware (MUST be placed after all routes)
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export { app };
