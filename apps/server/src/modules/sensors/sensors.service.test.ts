/**
 * @test sensors.service.test
 * @description Test suite cho Sensors Service — kiểm tra business logic của module Sensors.
 *
 * Phạm vi test (unit test thuần — mock Prisma Client):
 *  - Kiểm tra lưu đúng bản ghi sensor reading vào DB
 *  - Kiểm tra ném NotFoundException khi plotId không tồn tại
 *  - Kiểm tra ném BadRequestException khi sensor_type không hợp lệ
 *  - Kiểm tra query và tính toán đúng aggregation (avg, min, max)
 *  - Kiểm tra filter đúng theo khoảng thời gian (from, to timestamps)
 *  - Kiểm tra logic phát hiện giá trị vượt ngưỡng cảnh báo (threshold)
 *
 * Test cases sẽ viết:
 *  - ingestReading()      → lưu đúng dữ liệu khi payload hợp lệ
 *  - ingestReading()      → throw NotFoundException khi plotId không tồn tại
 *  - ingestReading()      → throw BadRequestException khi sensor_type không hợp lệ
 *  - getReadings()        → trả danh sách readings đúng theo filter thời gian
 *  - getLatestReading()   → trả bản ghi mới nhất theo plotId + sensor_type
 *  - getStatsSummary()    → tính đúng avg/min/max trong khoảng thời gian
 *
 * Tool: Vitest + vi.mock('@repo/database')
 *
 * TODO: Implement sau khi sensorsService và Prisma schema SensorReading được implement
 */
