/**
 * @layer shared/config
 * @description App configuration & environment variables wrapper — FSD Layer: shared.
 *
 * Trách nhiệm:
 *  - Đọc và export các biến môi trường từ import.meta.env (Vite env)
 *  - Cung cấp typed constants cho toàn app (thay vì truy cập import.meta.env trực tiếp)
 *  - Ví dụ:
 *    - API_BASE_URL     → URL backend (VITE_API_BASE_URL)
 *    - APP_ENV          → "development" | "staging" | "production"
 *    - MAPBOX_TOKEN     → API key cho bản đồ (nếu dùng)
 *    - PAGINATION_LIMIT → Số items mỗi trang mặc định
 *
 * Quy tắc FSD:
 *  - shared/ KHÔNG được import từ bất kỳ layer nào khác
 *  - Tất cả env vars PHẢI được khai báo trong .env.example và Vite type definitions
 *
 * TODO: Khai báo env vars trong vite-env.d.ts và implement config object
 */
export {};
