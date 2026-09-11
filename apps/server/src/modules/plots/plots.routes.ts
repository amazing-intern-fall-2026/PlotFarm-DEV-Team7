import { Router, Request, Response } from "express";
import { sendSuccess } from "../../common/utils";

export const plotsRouter: Router = Router();

plotsRouter.get("/ping", (_req: Request, res: Response) => {
  sendSuccess(res, { module: "plots", status: "ready" }, "Plots module is ready");
});
