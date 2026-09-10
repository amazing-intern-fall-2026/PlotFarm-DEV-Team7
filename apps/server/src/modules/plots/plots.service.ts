/**
 * @module plots/service
 * @description Plots Service — chứa toàn bộ business logic của domain Plots.
 *
 * Trách nhiệm:
 *  - Query danh sách lô đất với filter, sort, phân trang từ Prisma
 *  - Kiểm tra lô đất có tồn tại không trước khi update/delete
 *  - Validate logic nghiệp vụ: không thể xóa lô đang được thuê
 *  - Tính toán giá thuê theo diện tích / thời hạn
 *  - Tương tác với Prisma Client (@repo/database) để CRUD bảng Plot
 *
 * Quy tắc:
 *  - Service KHÔNG biết gì về HTTP (Request, Response)
 *  - Throw custom Exception (từ common/exceptions) khi có lỗi nghiệp vụ
 *
 * TODO: Implement sau khi Prisma schema Plot và Booking được define
 */
