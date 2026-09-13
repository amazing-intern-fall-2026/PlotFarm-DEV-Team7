import { Router } from "express";
import { createCareRequest } from "./care.controller";

export const careRouter: Router = Router();

careRouter.post("/contracts/:contractCode/care-requests", createCareRequest);
