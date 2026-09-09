/**
 * @layer common/utils
 * @description Helper functions dùng chung phía BE — Infrastructure Layer.
 *
 * Trách nhiệm:
 *  - Chứa các pure utility functions không phụ thuộc vào business domain cụ thể
 *  - Ví dụ:
 *    - sendSuccess(res, data, statusCode)     → Trả JSON response thành công chuẩn hóa
 *    - sendError(res, message, statusCode)    → Trả JSON response lỗi chuẩn hóa
 *    - parsePagination(query)                 → Parse và validate page/size từ query params
 *    - generateSlug(text)                     → Tạo slug URL-friendly từ string
 *    - hashPassword(password)                 → Wrapper bcrypt hash
 *    - comparePassword(plain, hash)           → Wrapper bcrypt compare
 *    - signJwt(payload, secret, options)      → Wrapper jsonwebtoken sign
 *    - verifyJwt(token, secret)               → Wrapper jsonwebtoken verify
 *
 * Quy tắc:
 *  - Mỗi nhóm chức năng tách thành file riêng (response.util.ts, crypto.util.ts...)
 *  - Barrel export tất cả từ index.ts này
 *
 * TODO: Implement từng util file theo nhu cầu trong các US tiếp theo
 */
export {};
