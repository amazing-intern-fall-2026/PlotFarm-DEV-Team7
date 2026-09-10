/**
 * @layer pages
 * @description Barrel export cho toàn bộ Pages — FSD Layer 2.
 *
 * Trách nhiệm:
 *  - Re-export tất cả page components để router trong app/ import gọn qua một điểm duy nhất
 *  - Mỗi sub-folder là 1 route-level screen độc lập
 *
 * Cấu trúc:
 *  pages/
 *  ├── home/         → màn hình Dashboard / Landing (route: "/")
 *  ├── not-found/    → màn hình 404 (route: "*")
 *  └── [tên-màn-hình]/ → các màn hình khác sẽ thêm theo US
 *
 * TODO: export các page components sau khi implement
 */
export {};
