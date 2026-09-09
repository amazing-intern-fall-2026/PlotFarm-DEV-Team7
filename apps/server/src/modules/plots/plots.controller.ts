/**
 * @module plots/controller
 * @description Plots Controller — xử lý HTTP request/response cho domain Plots.
 *
 * Trách nhiệm:
 *  - Nhận Request, validate query params / body (page, size, status filter...)
 *  - Gọi PlotsService để xử lý business logic
 *  - Trả Response JSON (danh sách có phân trang, chi tiết lô đất, kết quả CRUD)
 *  - KHÔNG chứa business logic — chỉ là tầng HTTP adapter
 *
 * Các handler sẽ implement:
 *  - getPlots(req, res)        → GET    /api/plots
 *  - getPlotById(req, res)     → GET    /api/plots/:id
 *  - createPlot(req, res)      → POST   /api/plots        [requires: authGuard, role: admin]
 *  - updatePlot(req, res)      → PATCH  /api/plots/:id    [requires: authGuard, role: admin]
 *  - deletePlot(req, res)      → DELETE /api/plots/:id    [requires: authGuard, role: admin]
 *
 * TODO: Implement các handler sau khi PlotsService và Prisma schema Plot sẵn sàng
 */
