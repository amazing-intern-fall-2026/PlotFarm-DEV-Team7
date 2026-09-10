/**
 * @module sensors/routes
 * @description Sensors Routes — định nghĩa Express Router cho domain Sensors.
 *
 * Trách nhiệm:
 *  - Khai báo tất cả HTTP endpoints của module Sensors
 *  - Phân tách: IoT device routes (API key auth) vs FE dashboard routes (JWT auth)
 *  - Gắn middleware validate Zod schema cho request body (ingest payload)
 *
 * Routes sẽ định nghĩa:
 *  POST /ingest              → sensorsController.ingestReading    [apiKeyGuard]
 *  GET  /:plotId/readings    → sensorsController.getReadings      [authGuard]
 *  GET  /:plotId/latest      → sensorsController.getLatestReading [authGuard]
 *  GET  /:plotId/stats       → sensorsController.getStatsSummary  [authGuard]
 *
 * Mount tại: /api/sensors (do modules/index.ts quy định)
 *
 * TODO: Implement sau khi controller và middleware sẵn sàng
 */
