/**
 * @test plots.controller.test
 * @description Test suite cho Plots Controller — kiểm tra HTTP layer của module Plots.
 *
 * Phạm vi test (mock PlotsService — không chạm DB):
 *  - Kiểm tra đúng HTTP status code và response structure cho từng endpoint
 *  - Kiểm tra xử lý đúng query params phân trang (page, size, status filter)
 *  - Kiểm tra xử lý đúng path params (:id)
 *  - Kiểm tra middleware authGuard được áp dụng đúng cho protected routes
 *  - Kiểm tra response 401 khi gọi protected route mà không có token
 *  - Kiểm tra response 403 khi user thường cố tạo / xóa plot (thiếu role admin)
 *
 * Test cases sẽ viết:
 *  - GET    /api/plots           → 200 + paginated list (public)
 *  - GET    /api/plots/:id       → 200 + plot detail (public)
 *  - GET    /api/plots/:id       → 404 khi plot không tồn tại
 *  - POST   /api/plots           → 201 khi admin tạo thành công
 *  - POST   /api/plots           → 403 khi non-admin tạo
 *  - PATCH  /api/plots/:id       → 200 khi admin cập nhật
 *  - DELETE /api/plots/:id       → 204 khi admin xóa thành công
 *
 * Tool: Vitest + supertest + vi.mock(PlotsService)
 *
 * TODO: Implement sau khi plotsController và plotsRouter được implement
 */
import { describe } from 'vitest';

describe.todo('plots.controller — CRUD endpoints, authGuard, roleGuard HTTP response tests');
