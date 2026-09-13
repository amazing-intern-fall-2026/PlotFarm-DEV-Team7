import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authGuard } from "../../middlewares/authGuard";

const router: Router = Router();

// Endpoint công khai để gia hạn access token
router.post("/refresh", AuthController.refresh);

// Đăng nhập giờ chỉ đi qua POST /api/gateway (action "auth.login"), không còn route trực tiếp.

// Endpoint được bảo vệ bằng authGuard
router.get("/profile", authGuard, AuthController.getProfile);

export { router as authRoutes, router as authRouter };
