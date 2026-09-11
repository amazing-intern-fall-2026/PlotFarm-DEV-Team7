/**
 * @layer widgets
 * @description Tầng Widgets — FSD Layer 3.
 *
 * Trách nhiệm:
 *  - Chứa các UI block lớn, composed từ nhiều entities + features
 *  - Widgets là các thành phần UI "tự chứa" (self-contained), tái sử dụng được giữa các pages
 *  - Ví dụ: Navbar, Sidebar, Footer, DashboardHeader, PlotMapWidget, SensorSummaryWidget
 *
 * Cấu trúc mỗi widget (sub-folder):
 *  widgets/
 *  └── navbar/
 *      ├── ui/         → component JSX
 *      ├── model/      → logic, hooks riêng của widget (nếu có)
 *      └── index.ts    → public API của widget
 *
 * Quy tắc FSD:
 *  - Được phép import từ: features/, entities/, shared/
 *  - KHÔNG import từ pages/ hoặc app/
 *
 * TODO: Tạo từng widget sub-folder khi bắt đầu implement UI
 */
export { Header } from './Header';
export type { HeaderProps, HeaderNavItem, HeaderUser, HeaderLabels } from './Header';

export { Footer } from './Footer';
export type { FooterProps, FooterConfig, FooterColumn, FooterLink, FooterContact } from './Footer';
