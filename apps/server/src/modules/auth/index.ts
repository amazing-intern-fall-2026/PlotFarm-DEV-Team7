/**
 * @module auth
 * @description Module Authentication & Authorization — Domain: Auth.
 *
 * Trách nhiệm của module này:
 *  - Đăng ký tài khoản (register)
 *  - Đăng nhập và phát JWT access token + refresh token (login)
 *  - Làm mới access token (refresh)
 *  - Đăng xuất, thu hồi refresh token (logout)
 *  - Xác thực email, đổi mật khẩu (nếu có)
 *
 * Public API của module (export ra ngoài):
 *  - authRouter  → Express Router đã gắn đủ routes
 *
 * Route prefix: /api/auth
 *
 * TODO: Export authRouter sau khi implement auth.routes.ts
 */
export {};
