/**
 * @test sensors.controller.test
 * @description Test suite cho Sensors Controller — kiểm tra HTTP layer của module Sensors.
 *
 * Phạm vi test (mock SensorsService — không chạm DB):
 *  - Kiểm tra ingest endpoint nhận đúng payload từ IoT device
 *  - Kiểm tra API key guard hoạt động đúng (401 khi thiếu / sai API key)
 *  - Kiểm tra validate đúng các trường bắt buộc trong payload (plotId, type, value, timestamp)
 *  - Kiểm tra trả 400 khi payload thiếu trường hoặc type không hợp lệ
 *  - Kiểm tra query readings trả đúng filter theo khoảng thời gian
 *
 * Test cases sẽ viết:
 *  - POST /api/sensors/ingest          → 201 khi payload hợp lệ + API key đúng
 *  - POST /api/sensors/ingest          → 401 khi thiếu API key
 *  - POST /api/sensors/ingest          → 400 khi payload thiếu trường bắt buộc
 *  - GET  /api/sensors/:plotId/readings → 200 + array readings
 *  - GET  /api/sensors/:plotId/latest  → 200 + latest reading object
 *  - GET  /api/sensors/:plotId/stats   → 200 + stats summary (min, max, avg)
 *
 * Tool: Vitest + supertest + vi.mock(SensorsService)
 *
 * TODO: Implement sau khi sensorsController và sensorsRouter được implement
 */
import { describe } from 'vitest';

describe.todo('sensors.controller — ingest, getReadings, getLatest, getStats HTTP response tests');
