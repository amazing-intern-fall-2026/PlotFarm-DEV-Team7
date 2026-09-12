import type { ApiErrorDetail, ResponseMeta, ApiResponseEnvelope } from "@repo/shared";

/**
 * Lỗi chuẩn hóa phía FE — mirror với BE AppError.
 * Wrap `ApiErrorResponse` từ @repo/shared để FE có thể instanceof-check.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errorCode: string;
  public readonly detail: ApiErrorDetail;
  public readonly meta: ResponseMeta;

  constructor(envelope: ApiResponseEnvelope) {
    const errDetail = envelope.error;
    super(errDetail?.message ?? envelope.message);
    this.name = "AppError";
    this.statusCode = envelope.code;
    this.errorCode = errDetail?.code ?? "ERR_UNKNOWN";
    this.detail = errDetail ?? { message: envelope.message };
    this.meta = envelope.meta;

    Object.setPrototypeOf(this, AppError.prototype);
  }

  /** Tạo AppError từ raw data bất kỳ — fallback khi parse thất bại */
  static fromUnknown(err: unknown, fallbackCode = "ERR_UNKNOWN"): AppError {
    if (err instanceof AppError) return err;

    const message =
      err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định.";

    const mockMeta: ResponseMeta = {
      correlationId: "",
      traceId: "",
      userCode: "",
      timestamp: new Date().toISOString(),
      rateLimit: { limit: 0, remaining: 0, resetInSeconds: 0, isSpamWarning: false },
    };

    return new AppError({
      code: 500,
      message,
      meta: mockMeta,
      error: { code: fallbackCode, message },
    });
  }

  /** Kiểm tra một error code cụ thể */
  is(code: string): boolean {
    return this.errorCode === code;
  }
}
