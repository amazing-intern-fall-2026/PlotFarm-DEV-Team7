import { ErrorRequestHandler } from "express";
import { ZodError } from "@repo/shared";
import { HttpException } from "../../exceptions";
import { sendError } from "../../utils/api-response";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  // 1. Handled HttpExceptions
  if (err instanceof HttpException) {
    sendError(res, err.statusCode, err.message, {
      code: err.errorCode,
      message: err.message,
      details: err.details
    });
    return;
  }

  // 2. Zod Schema Validation Errors
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((e: { path: (string | number)[]; message: string }) => ({
      field: e.path.join("."),
      message: e.message
    }));

    sendError(
      res,
      400,
      "Dữ liệu đầu vào không hợp lệ",
      {
        code: "VALIDATION_ERROR",
        message: "Dữ liệu đầu vào không hợp lệ",
        details: formattedErrors
      }
    );
    return;
  }

  // 3. Fallback unhandled errors
  console.error("Unhandled Error:", err);
  const isDev = process.env.NODE_ENV !== "production";
  sendError(
    res,
    500,
    isDev && err?.message ? err.message : "Đã xảy ra lỗi máy chủ nội bộ",
    {
      code: "INTERNAL_SERVER_ERROR",
      message: isDev && err?.message ? err.message : "Đã xảy ra lỗi máy chủ nội bộ",
      details: isDev ? err?.stack : undefined
    }
  );
};
