import { Response } from "express";
import {
  ApiResponseEnvelope,
  Pagination,
  ApiErrorDetail,
  ResponseMeta
} from "@repo/shared";

export function createMeta(overrides?: Partial<ResponseMeta>): ResponseMeta {
  return {
    timestamp: new Date().toISOString(),
    rateLimit: {
      limit: 100,
      remaining: 99,
      resetInSeconds: 60,
      isSpamWarning: false
    },
    ...overrides
  };
}

export function sendSuccess<T>(
  res: Response,
  data: T,
  message: string = "Thao tác thành công",
  statusCode: number = 200,
  metaOverrides?: Partial<ResponseMeta>
): Response {
  const payload: ApiResponseEnvelope<T> = {
    code: statusCode,
    message,
    meta: createMeta(metaOverrides),
    data
  };
  return res.status(statusCode).json(payload);
}

export function sendPaginated<T>(
  res: Response,
  data: T[],
  pagination: Pagination,
  message: string = "Lấy danh sách thành công",
  statusCode: number = 200,
  metaOverrides?: Partial<ResponseMeta>
): Response {
  const payload: ApiResponseEnvelope<T[]> = {
    code: statusCode,
    message,
    meta: createMeta(metaOverrides),
    data,
    pagination
  };
  return res.status(statusCode).json(payload);
}

export function sendError(
  res: Response,
  statusCode: number,
  message: string,
  errorDetail?: ApiErrorDetail,
  metaOverrides?: Partial<ResponseMeta>
): Response {
  const payload: ApiResponseEnvelope = {
    code: statusCode,
    message,
    meta: createMeta(metaOverrides),
    error: errorDetail || { message }
  };
  return res.status(statusCode).json(payload);
}
