import { Router } from "express";
import { authRouter } from "./auth";
import { plotsRouter } from "./plots";
import { usersRouter } from "./users";
import { sensorsRouter } from "./sensors";

export const modulesRouter: Router = Router();

modulesRouter.use("/auth", authRouter);
modulesRouter.use("/plots", plotsRouter);
modulesRouter.use("/users", usersRouter);
modulesRouter.use("/sensors", sensorsRouter);
