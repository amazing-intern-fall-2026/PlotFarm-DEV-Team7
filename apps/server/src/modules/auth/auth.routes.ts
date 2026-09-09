/**
 * @module auth/routes
 * @description Auth Routes — định nghĩa Express Router cho domain Auth.
 *
 * Trách nhiệm:
 *  - Khai báo tất cả HTTP endpoints của module Auth
 *  - Gắn middleware cụ thể cho từng route (validate body, rate-limit login...)
 *  - Map endpoint → controller handler tương ứng
 *
 * Routes sẽ định nghĩa:
 *  POST   /register  → authController.register
 *  POST   /login     → authController.login
 *  POST   /refresh   → authController.refresh
 *  POST   /logout    → authController.logout  [requires: authGuard middleware]
 *
 * Mount tại: /api/auth (do modules/index.ts quy định)
 *
 * TODO: Implement sau khi authController và middleware validate sẵn sàng
 */
