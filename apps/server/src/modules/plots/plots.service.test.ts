/**
 * @test plots.service.test
 * @description Test suite cho Plots Service — kiểm tra business logic của module Plots.
 *
 * Phạm vi test (unit test thuần — mock Prisma Client):
 *  - Kiểm tra logic query danh sách với filter / sort / phân trang
 *  - Kiểm tra ném NotFoundException khi plot không tồn tại
 *  - Kiểm tra validation nghiệp vụ: không xóa được plot đang được thuê
 *  - Kiểm tra tính toán đúng tổng số trang (totalPages) khi phân trang
 *  - Kiểm tra cập nhật đúng trạng thái lô đất (available → rented)
 *
 * Test cases sẽ viết:
 *  - getPlots()      → trả paginated result đúng với filter status
 *  - getPlotById()   → trả plot detail khi tìm thấy
 *  - getPlotById()   → throw NotFoundException khi không tìm thấy
 *  - createPlot()    → tạo plot mới thành công
 *  - updatePlot()    → cập nhật plot thành công
 *  - deletePlot()    → throw BadRequestException khi plot đang được thuê
 *  - deletePlot()    → xóa plot thành công khi không có booking active
 *
 * Tool: Vitest + vi.mock('@repo/database')
 *
 * TODO: Implement sau khi plotsService và Prisma schema Plot/Booking được implement
 */
import { describe } from 'vitest';

describe.todo('plots.service — getPlots, getPlotById, createPlot, updatePlot, deletePlot business logic tests');
