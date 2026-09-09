/**
 * @module users/service
 * @description Users Service — chứa toàn bộ business logic của domain Users.
 *
 * Trách nhiệm:
 *  - Query thông tin user hiện tại theo ID từ JWT payload
 *  - Cập nhật thông tin profile (displayName, phone, avatarUrl...)
 *  - Validate: email không được thay đổi, số điện thoại đúng định dạng VN
 *  - Admin: list users với filter (role, status), cập nhật role, ban account
 *  - Tương tác với Prisma Client (@repo/database) để CRUD bảng User
 *
 * Quy tắc:
 *  - Service KHÔNG biết gì về HTTP
 *  - Throw NotFoundException khi user không tồn tại
 *  - Throw ForbiddenException khi cố truy cập tài nguyên của user khác
 *
 * TODO: Implement sau khi Prisma schema User được define
 */
