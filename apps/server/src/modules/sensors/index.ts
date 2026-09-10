/**
 * @module sensors
 * @description Module Dữ liệu Cảm biến IoT (Sensor Telemetry) — Domain: Sensors.
 *
 * Trách nhiệm của module này:
 *  - Nhận và lưu trữ dữ liệu telemetry từ thiết bị cảm biến (IoT ingestion)
 *  - Query lịch sử dữ liệu cảm biến theo plot_id, khoảng thời gian, loại cảm biến
 *  - Tính toán thống kê: min, max, avg, latest reading
 *  - Hỗ trợ realtime feed (WebSocket / SSE) cho dashboard
 *
 * Public API của module (export ra ngoài):
 *  - sensorsRouter  → Express Router đã gắn đủ routes
 *
 * Route prefix: /api/sensors
 *
 * TODO: Export sensorsRouter sau khi implement sensors.routes.ts
 */
export {};
