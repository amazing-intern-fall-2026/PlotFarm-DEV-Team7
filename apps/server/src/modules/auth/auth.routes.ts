import { Router, Request, Response } from "express";
import { sendSuccess } from "../../common/utils";

export const authRouter: Router = Router();

authRouter.get("/ping", (_req: Request, res: Response) => {
  sendSuccess(res, { module: "auth", status: "ready" }, "Auth module is ready");
});
