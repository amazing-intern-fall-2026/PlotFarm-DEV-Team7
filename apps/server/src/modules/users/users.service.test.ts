/**
 * @test users.service.test
 * @description Test suite cho Users Service — kiểm tra business logic của module Users.
 *
 * Phạm vi test (unit test thuần — mock Prisma Client):
 *  - Kiểm tra getMe() trả đúng user theo ID từ JWT payload
 *  - Kiểm tra ném NotFoundException khi user không tồn tại
 *  - Kiểm tra updateMe() chỉ cập nhật được fields được phép (không được đổi email)
 *  - Kiểm tra ném ForbiddenException khi cố sửa thông tin user khác
 *  - Kiểm tra admin getAllUsers() trả danh sách có phân trang đúng
 *  - Kiểm tra updateUserRole() đổi role thành công
 *
 * Test cases sẽ viết:
 *  - getMe()            → trả user info khi ID hợp lệ
 *  - getMe()            → throw NotFoundException khi user không tồn tại
 *  - updateMe()         → cập nhật displayName, phone thành công
 *  - updateMe()         → throw BadRequestException khi cố đổi email
 *  - getAllUsers()       → trả paginated list với filter role đúng
 *  - updateUserRole()   → cập nhật role thành công
 *  - updateUserRole()   → throw NotFoundException khi user target không tồn tại
 *
 * Tool: Vitest + vi.mock('@repo/database')
 *
 * TODO: Implement sau khi usersService và Prisma schema User được implement
 */
