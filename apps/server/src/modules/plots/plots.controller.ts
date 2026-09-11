import type { Request, Response } from "express";
import { getMockPlots } from "./plots.service";
import { buildSuccessResponse } from "../../common/utils/envelope";

export function listPlots(_req: Request, res: Response) {
  const plots = getMockPlots();
  res.json(
    buildSuccessResponse(plots, "Lấy danh sách lô đất thành công (mock).", {
      pagination: {
        page: 1,
        pageSize: plots.length,
        totalItems: plots.length,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    }),
  );
}
