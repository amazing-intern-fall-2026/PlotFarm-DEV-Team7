/**
 * @module modules
 * @description Barrel export cho toàn bộ domain modules — BE Feature-Based Architecture.
 *
 * Trách nhiệm:
 *  - Re-export router của từng module để server.ts mount vào Express app một cách gọn gàng
 *  - Đây là điểm duy nhất server.ts cần import để đăng ký tất cả routes
 *
 * Cấu trúc:
 *  modules/
 *  ├── auth/      → Authentication & Authorization (login, register, refresh token)
 *  ├── plots/     → Quản lý lô đất (CRUD, tìm kiếm, lọc theo trạng thái)
 *  ├── sensors/   → Dữ liệu cảm biến IoT (telemetry ingestion, query lịch sử)
 *  └── users/     → Quản lý người dùng (profile, roles, permissions)
 *
 * Usage (trong server.ts):
 *  import { modulesRouter } from './modules';
 *  app.use('/api', modulesRouter);
 *
 * TODO: Export modulesRouter sau khi implement từng module
 */
export {};
