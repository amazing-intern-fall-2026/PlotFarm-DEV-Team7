/**
 * @layer common/exceptions
 * @description Custom HTTP Exception classes — BE Infrastructure Layer.
 *
 * Trách nhiệm:
 *  - Định nghĩa các class Exception chuẩn hóa để Service throw khi có lỗi nghiệp vụ
 *  - Global errorHandler middleware sẽ bắt các class này và trả JSON response nhất quán
 *  - Tránh việc mỗi service tự xây dựng error format riêng
 *
 * Exceptions sẽ implement (kế thừa từ base HttpException):
 *  - HttpException(statusCode, message)   → Base class
 *  - BadRequestException(message)         → 400
 *  - UnauthorizedException(message)       → 401
 *  - ForbiddenException(message)          → 403
 *  - NotFoundException(message)           → 404
 *  - ConflictException(message)           → 409
 *  - InternalServerException(message)     → 500
 *
 * Response format chuẩn khi throw exception:
 *  { "status": "error", "statusCode": 404, "message": "Plot not found" }
 *
 * TODO: Implement HttpException base class và các subclasses
 */
export {};
