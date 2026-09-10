/**
 * @module sensors/service
 * @description Sensors Service — chứa toàn bộ business logic của domain Sensors.
 *
 * Trách nhiệm:
 *  - Lưu bản ghi sensor reading mới vào DB (Prisma → SensorReading)
 *  - Query lịch sử reading theo plotId + khoảng thời gian + loại cảm biến
 *  - Tính toán aggregation: trung bình nhiệt độ, độ ẩm... trong khoảng thời gian
 *  - Kiểm tra giá trị cảm biến có vượt ngưỡng cảnh báo (threshold alert) không
 *  - Trigger notification nếu có bất thường (tích hợp với notification service sau)
 *
 * Loại cảm biến dự kiến: temperature, humidity, soil_moisture, light, ph
 *
 * Quy tắc:
 *  - Service KHÔNG biết gì về HTTP
 *  - Throw custom Exception khi plot_id không tồn tại hoặc sensor_type không hợp lệ
 *
 * TODO: Implement sau khi Prisma schema SensorReading được define
 */
