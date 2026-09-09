/**
 * @module plots
 * @description Module Quản lý Lô Đất (Plot) — Domain: Plots.
 *
 * Trách nhiệm của module này:
 *  - CRUD lô đất: tạo mới, xem danh sách, xem chi tiết, cập nhật, xóa
 *  - Lọc lô đất theo trạng thái (available, rented, maintenance)
 *  - Tìm kiếm lô đất theo vị trí / diện tích / giá thuê
 *  - Quản lý vòng đời lô đất: available → rented → available
 *
 * Public API của module (export ra ngoài):
 *  - plotsRouter  → Express Router đã gắn đủ routes
 *
 * Route prefix: /api/plots
 *
 * TODO: Export plotsRouter sau khi implement plots.routes.ts
 */
export {};
