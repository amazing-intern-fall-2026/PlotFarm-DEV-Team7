/**
 * @layer shared/api
 * @description API base client — HTTP layer dùng chung — FSD Layer: shared.
 *
 * Trách nhiệm:
 *  - Khởi tạo và export axios instance đã cấu hình sẵn (baseURL, timeout, headers)
 *  - Setup request interceptor: tự động đính kèm Authorization Bearer token
 *  - Setup response interceptor: xử lý lỗi 401 (auto refresh token / redirect login)
 *  - Cung cấp wrapper functions: get(), post(), put(), patch(), delete()
 *
 * Quy tắc FSD:
 *  - shared/ KHÔNG được import từ bất kỳ layer nào khác
 *  - Mọi API call từ features/ đều phải đi qua client này
 *  - Base URL lấy từ shared/config (env vars)
 *
 * TODO: Implement axios instance khi bắt đầu US liên quan đến auth hoặc data fetching
 */
export {};
