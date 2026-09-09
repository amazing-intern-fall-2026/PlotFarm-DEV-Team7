/**
 * @layer shared/lib
 * @description Utility helpers và thư viện tiện ích dùng chung — FSD Layer: shared.
 *
 * Trách nhiệm:
 *  - Chứa các pure functions không phụ thuộc vào UI hay business logic cụ thể
 *  - Ví dụ:
 *    - formatDate(date): string         → định dạng ngày tháng
 *    - formatCurrency(amount): string   → định dạng tiền tệ VND
 *    - cn(...classes): string           → merge classNames (clsx wrapper)
 *    - debounce(fn, delay)              → debounce helper
 *    - paginate(data, page, size)       → phân trang
 *
 * Quy tắc FSD:
 *  - shared/ KHÔNG được import từ bất kỳ layer nào khác
 *  - Mỗi file là 1 group utility theo nhóm chức năng (date.ts, currency.ts, cn.ts...)
 *
 * TODO: Tạo từng file helper khi có nhu cầu trong các US tiếp theo
 */
export {};
