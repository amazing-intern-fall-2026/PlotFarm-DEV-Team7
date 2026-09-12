import { Router } from "express";
import { login } from "./auth.controller";

export const authRouter: Router = Router();

authRouter.post("/auth/login", login);
