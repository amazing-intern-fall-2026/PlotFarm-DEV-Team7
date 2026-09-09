/**
 * @module sensors/controller
 * @description Sensors Controller — xử lý HTTP request/response cho domain Sensors.
 *
 * Trách nhiệm:
 *  - Nhận payload telemetry từ thiết bị IoT hoặc query từ FE dashboard
 *  - Validate dữ liệu đầu vào (plot_id tồn tại, sensor_type hợp lệ, timestamp...)
 *  - Gọi SensorsService để xử lý business logic
 *  - KHÔNG chứa business logic — chỉ là tầng HTTP adapter
 *
 * Các handler sẽ implement:
 *  - ingestReading(req, res)       → POST /api/sensors/ingest           [API key auth]
 *  - getReadings(req, res)         → GET  /api/sensors/:plotId/readings  [authGuard]
 *  - getLatestReading(req, res)    → GET  /api/sensors/:plotId/latest    [authGuard]
 *  - getStatsSummary(req, res)     → GET  /api/sensors/:plotId/stats     [authGuard]
 *
 * TODO: Implement sau khi SensorsService và Prisma schema SensorReading sẵn sàng
 */
