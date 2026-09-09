/**
 * @test auth.service.test
 * @description Test suite cho Auth Service — kiểm tra toàn bộ business logic của module Auth.
 *
 * Phạm vi test (unit test thuần — mock Prisma Client):
 *  - Kiểm tra logic hash password trước khi lưu DB
 *  - Kiểm tra ném ConflictException khi email đã tồn tại
 *  - Kiểm tra tạo đúng JWT access token và refresh token
 *  - Kiểm tra verify token hợp lệ / hết hạn / sai chữ ký
 *  - Kiểm tra lưu refresh token vào DB sau khi login
 *  - Kiểm tra xóa refresh token khỏi DB khi logout
 *  - Kiểm tra ném UnauthorizedException khi refresh token không hợp lệ
 *
 * Test cases sẽ viết:
 *  - register() → hash password và tạo user thành công
 *  - register() → throw ConflictException khi email đã dùng
 *  - login()    → trả access + refresh tokens khi credentials đúng
 *  - login()    → throw UnauthorizedException khi password sai
 *  - refresh()  → trả access token mới khi refresh token hợp lệ
 *  - logout()   → xóa refresh token thành công
 *
 * Tool: Vitest + vi.mock('@repo/database') để mock Prisma Client
 *
 * TODO: Implement sau khi authService được implement
 */
import { describe } from 'vitest';

describe.todo('auth.service — register, login, refresh, logout business logic tests');
