/**
 * @layer common/types
 * @description Shared TypeScript types & interfaces phía BE — Infrastructure Layer.
 *
 * Trách nhiệm:
 *  - Chứa các type dùng chung giữa nhiều modules mà KHÔNG nằm trong @repo/shared
 *  - Ví dụ:
 *    - AuthenticatedRequest  → Express Request đã được gắn req.user (sau authGuard)
 *    - JwtPayload            → Cấu trúc payload bên trong JWT token
 *    - PaginationQuery       → { page: number; size: number; sortBy?: string }
 *    - PaginatedResult<T>    → { data: T[]; total: number; page: number; totalPages: number }
 *    - ApiSuccessResponse<T> → { status: "success"; data: T }
 *    - UserRole              → "admin" | "farmer" | "viewer"
 *
 * Phân biệt với @repo/shared:
 *  - @repo/shared      → types dùng chung cả FE lẫn BE (Zod schemas, domain entities)
 *  - common/types      → types CHỈ dùng ở BE (Express types, pagination wrappers...)
 *
 * TODO: Thêm types theo nhu cầu của từng US
 */
export {};
