/**
 * @layer entities
 * @description Tầng Entities (Thực thể nghiệp vụ cốt lõi) — FSD Layer 4.
 *
 * Hướng dẫn triển khai:
 * 1. user/       → Thực thể người dùng, thông tin tài khoản, vai trò.
 * 2. plot/       → Thực thể mảnh đất / ô đất canh tác thực nghiệm.
 * 3. crop/       → Thực thể cây trồng, giống rau củ, mùa vụ.
 * 4. farm/       → Thực thể nông trại mẫu, phân khu.
 * 5. contract/   → Thực thể hợp đồng thuê đất, thanh toán.
 *
 * Mỗi thực thể bao gồm:
 *  - model/      → Types, schemas, state quản lý
 *  - api/        → API request hooks/services
 *  - ui/         → Component đại diện cơ bản (PlotCard, UserAvatar, CropBadge)
 */
export {};
