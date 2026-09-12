import { Router } from "express";
import { listPlots } from "./plots.controller";

export const plotsRouter: Router = Router();

plotsRouter.get("/plots", listPlots);
