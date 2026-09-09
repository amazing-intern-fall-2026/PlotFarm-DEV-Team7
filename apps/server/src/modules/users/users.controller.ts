/**
 * @module users/controller
 * @description Users Controller — xử lý HTTP request/response cho domain Users.
 *
 * Trách nhiệm:
 *  - Nhận Request và gọi UsersService để xử lý business logic
 *  - Trả Response JSON phù hợp
 *  - KHÔNG chứa business logic — chỉ là tầng HTTP adapter
 *
 * Các handler sẽ implement:
 *  - getMe(req, res)             → GET    /api/users/me           [authGuard]
 *  - updateMe(req, res)          → PATCH  /api/users/me           [authGuard]
 *  - getAllUsers(req, res)        → GET    /api/users              [authGuard + role:admin]
 *  - getUserById(req, res)        → GET    /api/users/:id          [authGuard + role:admin]
 *  - updateUserRole(req, res)     → PATCH  /api/users/:id/role     [authGuard + role:admin]
 *
 * TODO: Implement sau khi UsersService và Prisma schema User sẵn sàng
 */
