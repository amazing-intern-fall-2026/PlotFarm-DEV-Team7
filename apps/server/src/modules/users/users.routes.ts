import { Router, Request, Response } from "express";
import { sendSuccess } from "../../common/utils";

export const usersRouter: Router = Router();

usersRouter.get("/ping", (_req: Request, res: Response) => {
  sendSuccess(res, { module: "users", status: "ready" }, "Users module is ready");
});
