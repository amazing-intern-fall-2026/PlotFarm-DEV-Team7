import { Router } from "express";
import { AuthController, login } from "./auth.controller";
import { authGuard } from "../../middlewares/authGuard";

const router: Router = Router();

// Endpoint công khai để đăng ký tài khoản
router.post("/register", AuthController.register);
router.post("/signup", AuthController.register);

// Endpoint công khai để gia hạn access token
router.post("/refresh", AuthController.refresh);

// Endpoint login
router.post("/login", login);
router.post("/auth/login", login);

// Endpoint được bảo vệ bằng authGuard
router.get("/profile", authGuard, AuthController.getProfile);

export { router as authRoutes, router as authRouter };

