/**
 * @module users/routes
 * @description Users Routes — định nghĩa Express Router cho domain Users.
 *
 * Trách nhiệm:
 *  - Khai báo tất cả HTTP endpoints của module Users
 *  - Phân quyền: user routes (self) vs admin routes (all users)
 *  - Gắn middleware authGuard và roleGuard cho từng route phù hợp
 *
 * Routes sẽ định nghĩa:
 *  GET    /me          → usersController.getMe           [authGuard]
 *  PATCH  /me          → usersController.updateMe        [authGuard]
 *  GET    /            → usersController.getAllUsers      [authGuard + role:admin]
 *  GET    /:id         → usersController.getUserById     [authGuard + role:admin]
 *  PATCH  /:id/role    → usersController.updateUserRole  [authGuard + role:admin]
 *
 * Mount tại: /api/users (do modules/index.ts quy định)
 *
 * TODO: Implement sau khi controller và middleware sẵn sàng
 */
