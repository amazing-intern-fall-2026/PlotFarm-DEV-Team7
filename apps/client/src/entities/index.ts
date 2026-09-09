/**
 * @layer entities
 * @description Tầng Entities — FSD Layer 5.
 *
 * Trách nhiệm:
 *  - Chứa các domain model UI: component + type + mock data của từng entity nghiệp vụ
 *  - Entities phản ánh trực tiếp các model trong database (Plot, User, Sensor, Booking...)
 *  - Ví dụ theo domain Plot Farm:
 *    - plot/    → PlotCard component, PlotBadge, Plot type, plot mock
 *    - user/    → UserAvatar, UserTag, User type, user mock
 *    - sensor/  → SensorReadingRow, SensorStatus, Sensor type
 *
 * Cấu trúc mỗi entity (sub-folder):
 *  entities/
 *  └── plot/
 *      ├── ui/         → UI components thể hiện entity (PlotCard, PlotBadge...)
 *      ├── model/      → TypeScript types + mock data của entity
 *      └── index.ts    → public API của entity
 *
 * Quy tắc FSD:
 *  - Được phép import từ: shared/
 *  - KHÔNG import từ features/, widgets/, pages/, app/
 *  - KHÔNG import chéo giữa các entities với nhau
 *
 * TODO: Tạo từng entity sub-folder khi có schema từ @repo/shared
 */
export {};
