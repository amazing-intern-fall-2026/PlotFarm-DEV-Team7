import type { HeaderLabels, HeaderNavItem } from './types';
import type { BadgeProps } from '@/shared/ui/Badge';

export const DEFAULT_HEADER_LABELS: Required<HeaderLabels> = {
  login: 'Đăng nhập',
  register: 'Bắt đầu ngay',
  logout: 'Đăng xuất',
  profile: 'Hồ sơ cá nhân',
  settings: 'Cài đặt tài khoản',
  notificationAria: 'Thông báo',
  menuAria: 'Mở danh mục điều hướng',
  backAria: 'Quay lại',
  adminRole: 'Quản trị viên',
  staffRole: 'Kỹ thuật viên',
  customerRole: 'Khách hàng',
};

export const DEFAULT_CUSTOMER_AUTH_NAV: HeaderNavItem[] = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Khám phá ô đất', href: '/plots' },
  { label: 'Vườn của tôi', href: '/customer/my-plots' },
  { label: 'Về chúng tôi', href: '/about' },
];

export const DEFAULT_NAV_BY_ROLE: Record<'customer' | 'farmer' | 'admin', HeaderNavItem[]> = {
  customer: [
    { label: 'Trang chủ', href: '/' },
    { label: 'Gói thuê đất', href: '/plots' },
    { label: 'Cây trồng', href: '/crops' },
    { label: 'Nông trại mẫu', href: '/farms' },
    { label: 'Về chúng tôi', href: '/about' },
  ],
  farmer: [
    { label: 'Ô đất phụ trách', href: '/staff/assigned-plots', badge: '5 ô' },
    { label: 'Phiếu chăm sóc', href: '/staff/care-tasks', badge: 'Hôm nay' },
    { label: 'Nhật ký & Đo đạc', href: '/staff/telemetry' },
    { label: 'Lệnh thu hoạch', href: '/staff/harvests' },
  ],
  admin: [
    { label: 'Tổng quan', href: '/admin/dashboard' },
    { label: 'Quản lý thửa đất', href: '/admin/plots' },
    { label: 'Cây trồng & Mùa vụ', href: '/admin/crops' },
    { label: 'Nông trại', href: '/admin/farms' },
    { label: 'Hợp đồng & Đơn hàng', href: '/admin/compensations' },
    { label: 'Nhật ký kiểm toán', href: '/admin/audit-logs' },
  ],
};

export const ROLE_BADGE_CONFIG: Record<
  string,
  { labelKey: keyof Pick<HeaderLabels, 'adminRole' | 'staffRole' | 'customerRole'>; variant: NonNullable<BadgeProps['variant']> }
> = {
  ADMIN: { labelKey: 'adminRole', variant: 'destructive' },
  STAFF: { labelKey: 'staffRole', variant: 'warning' },
  CUSTOMER: { labelKey: 'customerRole', variant: 'success' },
};
