/**
 * @test auth.controller.test
 * @description Test suite cho Auth Controller — kiểm tra HTTP layer của module Auth.
 *
 * Phạm vi test (KHÔNG test business logic — đó là việc của auth.service.test):
 *  - Kiểm tra controller nhận đúng HTTP method và path
 *  - Kiểm tra controller trả đúng HTTP status code cho từng case
 *  - Kiểm tra controller đọc đúng dữ liệu từ req.body / req.params
 *  - Kiểm tra controller gọi đúng AuthService method với đúng arguments (mock service)
 *  - Kiểm tra controller trả đúng JSON response structure
 *
 * Test cases sẽ viết:
 *  - POST /api/auth/register → 201 khi tạo thành công
 *  - POST /api/auth/register → 409 khi email đã tồn tại
 *  - POST /api/auth/login    → 200 + tokens khi credentials đúng
 *  - POST /api/auth/login    → 401 khi credentials sai
 *  - POST /api/auth/refresh  → 200 + access token mới khi refresh token hợp lệ
 *  - POST /api/auth/refresh  → 401 khi refresh token hết hạn
 *  - POST /api/auth/logout   → 200 khi đăng xuất thành công
 *
 * Tool: Vitest + supertest (HTTP assertion) + vi.mock (mock AuthService)
 *
 * TODO: Implement sau khi authController và authRouter được implement
 */
