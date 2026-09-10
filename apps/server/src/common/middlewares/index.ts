/**
 * @layer common/middlewares
 * @description Express Middlewares dùng chung — BE Infrastructure Layer.
 *
 * Trách nhiệm:
 *  - Chứa tất cả Express middleware functions được dùng trên nhiều modules
 *  - KHÔNG chứa business logic — chỉ là cross-cutting concerns
 *
 * Middlewares sẽ implement:
 *  - authGuard          → Xác thực JWT token, gắn user vào req.user
 *  - roleGuard(role)    → Kiểm tra quyền hạn của user (admin / farmer / viewer)
 *  - apiKeyGuard        → Xác thực API key cho IoT devices (sensor ingestion)
 *  - errorHandler       → Global error handler: bắt Exception, trả JSON lỗi chuẩn
 *  - requestLogger      → Log mỗi HTTP request (method, path, status, duration)
 *  - validateBody(schema) → Validate request body với Zod schema, trả 400 nếu sai
 *
 * TODO: Implement từng middleware theo thứ tự ưu tiên trong các US tiếp theo
 */
export {};
