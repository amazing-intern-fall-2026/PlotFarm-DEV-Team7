import express, { type Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

export const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "plot-farm-server",
    message: "Server ready for module implementations.",
  });
});

/**
 * Hướng dẫn triển khai API:
 * 1. Triển khai các router trong từng module (src/modules/[module-name]/)
 * 2. Mount các module routers vào tiền tố `/api/v1`
 * 3. Bổ sung middleware xác thực JWT và kiểm soát quyền hạn (RBAC)
 * 4. Cấu hình middleware xử lý lỗi tập trung (centralized error handler)
 */

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
