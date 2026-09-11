export class HttpException extends Error {
  public readonly statusCode: number;
  public readonly errorCode: string;
  public readonly isOperational: boolean;
  public readonly details?: unknown;

  constructor(
    statusCode: number,
    message: string,
    errorCode: string = "INTERNAL_ERROR",
    details?: unknown,
    isOperational: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string = "Dữ liệu yêu cầu không hợp lệ", details?: unknown) {
    super(400, message, "BAD_REQUEST", details);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string = "Bạn chưa đăng nhập hoặc phiên đã hết hạn") {
    super(401, message, "UNAUTHORIZED");
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string = "Bạn không có quyền thực hiện hành động này") {
    super(403, message, "FORBIDDEN");
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string = "Không tìm thấy tài nguyên yêu cầu") {
    super(404, message, "NOT_FOUND");
  }
}

export class ConflictException extends HttpException {
  constructor(message: string = "Tài nguyên đã tồn tại hoặc xảy ra xung đột dữ liệu") {
    super(409, message, "CONFLICT");
  }
}

export class TooManyRequestsException extends HttpException {
  constructor(message: string = "Bạn đang thao tác quá nhanh. Vui lòng thử lại sau.") {
    super(429, message, "TOO_MANY_REQUESTS");
  }
}

export class InternalServerException extends HttpException {
  constructor(message: string = "Đã xảy ra lỗi máy chủ nội bộ", details?: unknown) {
    super(500, message, "INTERNAL_SERVER_ERROR", details, false);
  }
}
