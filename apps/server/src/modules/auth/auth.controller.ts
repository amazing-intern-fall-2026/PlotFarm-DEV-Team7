import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { LoginRequestSchema } from "@repo/shared";
import { TokenService } from "./token.service";
import { getMockLoginResponse } from "./auth.service";
import { buildSuccessResponse } from "../../common/utils/envelope";

const RefreshSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token là bắt buộc"),
});

export class AuthController {
  /**
   * Endpoint: POST /api/auth/refresh
   * Nhận refreshToken và trả về accessToken mới
   */
  static async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedBody = RefreshSchema.parse(req.body);
      const result = await TokenService.refreshAccessToken(validatedBody.refreshToken);

      res.status(200).json({
        success: true,
        data: {
          accessToken: result.accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Endpoint: GET /api/auth/profile
   * Route được bảo vệ bởi authGuard
   */
  static async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json({
        success: true,
        data: {
          user: req.user,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export function login(req: Request, res: Response): void {
  const credentials = req.body?.payload ?? req.body;
  const parsed = LoginRequestSchema.safeParse(credentials);
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
