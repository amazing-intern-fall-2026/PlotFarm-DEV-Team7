/**
 * @layer shared/stores
 * @description Global state management với Zustand — FSD Layer: shared.
 *
 * Trách nhiệm:
 *  - Chứa các Zustand store TOÀN CỤC dùng chung giữa nhiều features
 *  - Ví dụ store phù hợp ở đây:
 *    - authStore      → currentUser, accessToken, isAuthenticated
 *    - uiStore        → isSidebarOpen, activeTheme, toastQueue
 *    - notifyStore    → thông báo realtime (WebSocket events)
 *  - Store của từng feature cụ thể → để trong features/<name>/model/ (KHÔNG để ở đây)
 *
 * Quy tắc FSD:
 *  - shared/ KHÔNG được import từ bất kỳ layer nào khác
 *  - Mỗi store là 1 file riêng (auth.store.ts, ui.store.ts...)
 *  - Export hook dạng useAuthStore(), useUiStore() từ index này
 *
 * TODO: Implement từng store khi bắt đầu US auth và US layout
 */
export {};
