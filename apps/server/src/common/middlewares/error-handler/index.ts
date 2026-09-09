/**
 * @layer common/middlewares/error-handler
 * @description Global Error Handler Middleware — Xử lý lỗi tập trung toàn bộ Express app.
 *
 * Đây là middleware CUỐI CÙNG được mount vào Express app (sau tất cả routes).
 * Bắt mọi lỗi được throw hoặc next(error) từ bất kỳ route/middleware nào.
 *
 * Trách nhiệm:
 *  - Bắt các instance của HttpException (từ common/exceptions) → trả JSON với statusCode đúng
 *  - Bắt Prisma errors (P2002 unique constraint, P2025 not found...) → map sang HTTP status phù hợp
 *  - Bắt Zod ValidationError → trả 400 với chi tiết lỗi validate từng field
 *  - Bắt JsonWebTokenError / TokenExpiredError → trả 401
 *  - Bắt các Error không xác định → log và trả 500 Internal Server Error
 *  - Trong môi trường development: trả kèm stack trace để debug
 *  - Trong môi trường production: ẩn stack trace, chỉ trả message an toàn
 *
 * Response format chuẩn hóa:
 *  {
 *    "status": "error",
 *    "statusCode": number,
 *    "message": string,
 *    "errors"?: object   // chỉ có khi là ValidationError (Zod)
 *  }
 *
 * Mount trong server.ts (BẮT BUỘC phải đặt CUỐI CÙNG sau tất cả routes):
 *  app.use(errorHandler);  // ← phải là dòng cuối cùng
 *
 * TODO: Implement errorHandler function (4-argument Express error middleware)
 */
export {};
