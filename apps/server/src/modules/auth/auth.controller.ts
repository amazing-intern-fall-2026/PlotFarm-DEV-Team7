import type { Request, Response } from "express";
import { LoginRequestSchema } from "@repo/shared";
import { getMockLoginResponse } from "./auth.service";
import { buildSuccessResponse } from "../../common/utils/envelope";

export function login(req: Request, res: Response): void {
  const parsed = LoginRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      code: 400,
      message: "Dữ liệu đăng nhập không hợp lệ.",
      error: parsed.error.flatten(),
    });
    return;
  }

  const data = getMockLoginResponse(parsed.data.email);
  res.json(buildSuccessResponse(data, "Đăng nhập thành công (mock)."));
}
