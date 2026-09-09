/**
 * @layer app
 * @description Tầng khởi tạo ứng dụng (App Layer) — FSD Layer 1 (cao nhất).
 *
 * Trách nhiệm:
 *  - Mount RouterProvider (react-router-dom)
 *  - Wrap toàn bộ app với các global Providers (QueryClientProvider, ThemeProvider...)
 *  - Cấu hình router tập trung: định nghĩa tất cả routes của app
 *  - Import global styles (index.css)
 *
 * Quy tắc FSD:
 *  - Tầng này được phép import từ tất cả các layer bên dưới (pages, widgets, features, entities, shared)
 *  - KHÔNG có tầng nào import ngược lại vào app/
 *
 * TODO (các US tiếp theo sẽ implement):
 *  - Định nghĩa router với createBrowserRouter
 *  - Setup React Query client
 *  - Setup Zustand devtools (nếu cần)
 */
export {};
