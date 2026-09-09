/**
 * @test shared/api.test
 * @description Test suite cho API base client — shared/api.
 *
 * Phạm vi test (mock axios — không gọi HTTP thật):
 *  - Kiểm tra axios instance được tạo với đúng baseURL từ config
 *  - Kiểm tra request interceptor tự động gắn Authorization header khi có token
 *  - Kiểm tra request interceptor không gắn header khi chưa login
 *  - Kiểm tra response interceptor xử lý 401 → gọi refresh token tự động
 *  - Kiểm tra response interceptor redirect về /login khi refresh thất bại
 *  - Kiểm tra wrapper get()/post()/put()/patch()/delete() gọi axios đúng method
 *
 * Tool: Vitest + vi.mock('axios')
 *
 * TODO: Implement sau khi axios instance và interceptors được implement
 */
export {};
