/**
 * @module auth/controller
 * @description Auth Controller — xử lý HTTP request/response cho domain Auth.
 *
 * Trách nhiệm:
 *  - Nhận Request từ Express Router, validate input cơ bản
 *  - Gọi AuthService để xử lý business logic
 *  - Trả Response JSON với status code phù hợp (200, 201, 400, 401, 409...)
 *  - KHÔNG chứa business logic — chỉ là tầng HTTP adapter
 *
 * Các handler sẽ implement:
 *  - register(req, res)  → POST /api/auth/register
 *  - login(req, res)     → POST /api/auth/login
 *  - refresh(req, res)   → POST /api/auth/refresh
 *  - logout(req, res)    → POST /api/auth/logout
 *
 * TODO: Implement các handler sau khi AuthService và Prisma schema sẵn sàng
 */
