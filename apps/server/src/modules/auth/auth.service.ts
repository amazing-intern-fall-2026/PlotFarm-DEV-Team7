/**
 * @module auth/service
 * @description Auth Service — chứa toàn bộ business logic của domain Auth.
 *
 * Trách nhiệm:
 *  - Kiểm tra email đã tồn tại chưa khi đăng ký
 *  - Hash password bằng bcrypt trước khi lưu DB
 *  - Tạo JWT access token (short-lived: 15m) và refresh token (long-lived: 7d)
 *  - Verify và decode JWT token
 *  - Lưu / xóa refresh token trong DB (bảng RefreshToken)
 *  - Tương tác với Prisma Client (@repo/database) để query User
 *
 * Quy tắc:
 *  - Service KHÔNG biết gì về HTTP (Request, Response) — thuần business logic
 *  - Throw custom Exception (từ common/exceptions) khi có lỗi nghiệp vụ
 *
 * TODO: Implement sau khi Prisma schema User và RefreshToken được define
 */
