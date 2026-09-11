import { Router, Request, Response } from "express";
import { sendSuccess } from "../../common/utils";

export const sensorsRouter: Router = Router();

sensorsRouter.get("/ping", (_req: Request, res: Response) => {
  sendSuccess(res, { module: "sensors", status: "ready" }, "Sensors module is ready");
});
