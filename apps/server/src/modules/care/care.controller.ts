import type { Request, Response } from "express";
import { CreateCareRequestSchema } from "@repo/shared";
import { createMockCareRequest } from "./care.service";
import { buildSuccessResponse } from "../../common/utils/envelope";

export function createCareRequest(req: Request, res: Response): void {
  const parsed = CreateCareRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      code: 400,
      message: "Dữ liệu yêu cầu chăm sóc không hợp lệ.",
      error: parsed.error.flatten(),
    });
    return;
  }

  const { contractCode } = req.params;
  const data = createMockCareRequest(contractCode, parsed.data.serviceType);
  res
    .status(201)
    .json(
      buildSuccessResponse(data, "Đặt lịch chăm sóc bổ sung thành công (mock).", {
        code: 201,
      }),
    );
}
