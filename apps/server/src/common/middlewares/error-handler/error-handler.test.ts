/**
 * @test common/middlewares/error-handler.test
 * @description Test suite cho Global Error Handler Middleware.
 *
 * Phạm vi test (unit test — mock Express req/res/next):
 *  - Kiểm tra bắt HttpException → trả đúng statusCode và message
 *  - Kiểm tra bắt Zod ValidationError → trả 400 với chi tiết errors
 *  - Kiểm tra bắt Prisma P2002 (unique constraint) → trả 409
 *  - Kiểm tra bắt Prisma P2025 (record not found) → trả 404
 *  - Kiểm tra bắt JsonWebTokenError → trả 401
 *  - Kiểm tra bắt TokenExpiredError → trả 401
 *  - Kiểm tra bắt unknown Error → trả 500
 *  - Kiểm tra dev mode: response có stack trace
 *  - Kiểm tra prod mode: response KHÔNG có stack trace
 *
 * Tool: Vitest + vi.mock Express response object
 *
 * TODO: Implement sau khi errorHandler được implement
 */
import { describe } from 'vitest';

describe.todo('error-handler middleware — HttpException, Zod, Prisma, JWT, unknown error handling tests');
