/**
 * @test users.controller.test
 * @description Test suite cho Users Controller — kiểm tra HTTP layer của module Users.
 *
 * Phạm vi test (mock UsersService — không chạm DB):
 *  - Kiểm tra GET /me trả đúng thông tin user từ JWT payload
 *  - Kiểm tra PATCH /me cập nhật đúng fields được phép
 *  - Kiểm tra admin routes trả 403 khi user thường truy cập
 *  - Kiểm tra 401 khi gọi các protected routes mà không có token
 *  - Kiểm tra validate body khi update profile (phone format, displayName length...)
 *
 * Test cases sẽ viết:
 *  - GET    /api/users/me       → 200 + user profile khi có token hợp lệ
 *  - GET    /api/users/me       → 401 khi không có token
 *  - PATCH  /api/users/me       → 200 khi cập nhật profile hợp lệ
 *  - PATCH  /api/users/me       → 400 khi body không hợp lệ (số điện thoại sai định dạng)
 *  - GET    /api/users          → 200 + danh sách khi là admin
 *  - GET    /api/users          → 403 khi không phải admin
 *  - PATCH  /api/users/:id/role → 200 khi admin đổi role thành công
 *
 * Tool: Vitest + supertest + vi.mock(UsersService)
 *
 * TODO: Implement sau khi usersController và usersRouter được implement
 */
import { describe } from 'vitest';

describe.todo('users.controller — getMe, updateMe, getAllUsers, updateUserRole HTTP response tests');
