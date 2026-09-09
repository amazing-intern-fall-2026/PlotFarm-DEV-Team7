/**
 * @layer shared/types
 * @description TypeScript types & interfaces dùng chung phía FE — FSD Layer: shared.
 *
 * Trách nhiệm:
 *  - Chứa các type chỉ dùng ở FE, không có trong @repo/shared (package shared monorepo)
 *  - Ví dụ:
 *    - ApiResponse<T>          → wrapper type cho HTTP response
 *    - PaginatedResponse<T>    → type cho response có phân trang
 *    - SelectOption            → { label: string; value: string } cho dropdown
 *    - RouteHandle             → type cho React Router route metadata
 *    - Theme                   → "light" | "dark"
 *
 * Phân biệt với @repo/shared:
 *  - @repo/shared → types dùng chung cả FE lẫn BE (Zod schemas, domain entities)
 *  - shared/types  → types CHỈ dùng ở FE (UI state, component props types chung...)
 *
 * Quy tắc FSD:
 *  - shared/ KHÔNG được import từ bất kỳ layer nào khác
 *
 * TODO: Thêm types theo nhu cầu của từng US
 */
export {};
