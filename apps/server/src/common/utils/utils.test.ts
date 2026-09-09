/**
 * @test common/utils.test
 * @description Test suite cho shared utility functions — common/utils.
 *
 * Phạm vi test:
 *  - sendSuccess() → gọi res.status().json() với đúng structure { status: 'success', data }
 *  - sendError()   → gọi res.status().json() với đúng structure { status: 'error', message }
 *  - parsePagination() → parse và clamp đúng page/size từ query string
 *  - parsePagination() → dùng default values khi query thiếu page hoặc size
 *  - hashPassword()    → trả hash khác plain text
 *  - comparePassword() → trả true khi plain matches hash
 *  - comparePassword() → trả false khi plain không khớp
 *  - signJwt()         → tạo JWT string hợp lệ
 *  - verifyJwt()       → decode đúng payload từ token hợp lệ
 *  - verifyJwt()       → throw error khi token hết hạn hoặc sai chữ ký
 *
 * Tool: Vitest (pure unit test, không cần mock nặng)
 *
 * TODO: Implement sau khi từng util function được implement
 */
