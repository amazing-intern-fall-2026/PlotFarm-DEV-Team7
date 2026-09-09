/**
 * @layer features
 * @description Tầng Features — FSD Layer 4.
 *
 * Trách nhiệm:
 *  - Chứa các business feature độc lập, mỗi feature giải quyết 1 use case cụ thể của người dùng
 *  - Mỗi feature có UI, logic (hooks/store slice), và API calls riêng
 *  - Ví dụ theo domain Plot Farm:
 *    - auth/             → Đăng nhập, đăng ký, refresh token
 *    - plot-rent/        → Thuê lô đất, xem chi tiết lô, thanh toán
 *    - sensor-telemetry/ → Xem dữ liệu cảm biến realtime
 *    - plot-map/         → Bản đồ tương tác các lô đất
 *
 * Cấu trúc mỗi feature (sub-folder):
 *  features/
 *  └── auth/
 *      ├── ui/         → components UI của feature
 *      ├── model/      → Zustand slice / React Query hooks
 *      ├── api/        → API calls riêng của feature
 *      └── index.ts    → public API: chỉ export những gì cần ra ngoài
 *
 * Quy tắc FSD:
 *  - Được phép import từ: entities/, shared/
 *  - KHÔNG import từ pages/, widgets/, app/
 *  - KHÔNG import chéo giữa các features với nhau
 *
 * TODO: Tạo từng feature sub-folder theo từng US
 */
export {};
