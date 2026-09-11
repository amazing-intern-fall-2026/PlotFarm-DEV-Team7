import type { FooterConfig } from './types';

export const DEFAULT_FOOTER_CONFIG: FooterConfig = {
  description:
    'Nền tảng nông nghiệp thông minh giúp gia đình bạn sở hữu lô đất canh tác nông sản hữu cơ chuẩn VietGAP tại Đà Lạt từ xa qua camera IoT.',
  badges: ['VietGAP Certified', 'GlobalG.A.P Farm', 'Organic Bio'],
  columns: [
    {
      title: 'Quy Trình & Canh Tác',
      links: [
        { label: 'Chọn lô đất canh tác', href: '/plots' },
        { label: 'Lập kế hoạch trồng & chọn rau', href: '/crops' },
        { label: 'Giám sát qua camera IoT 24/7', href: '/farms' },
        { label: 'Thu hoạch & Giao hàng tận nhà', href: '/about' },
      ],
    },
    {
      title: 'Hỗ Trợ & Chính Sách',
      links: [
        { label: 'Chính sách bảo hiểm mùa vụ', href: '/about' },
        { label: 'Tiêu chuẩn kiểm nghiệm đất & nước', href: '/about' },
        { label: 'Trải nghiệm tham quan nông trại', href: '/farms' },
        { label: 'Điều khoản thuê đất canh tác', href: '/about' },
      ],
    },
  ],
  contact: {
    title: 'Trang Trại Đà Lạt',
    address: 'Địa chỉ: Thôn Lạc Dương, Huyện Lạc Dương, TP. Đà Lạt, Lâm Đồng',
    hotline: 'Hotline hỗ trợ: 1900 6868',
    email: 'Email: hotro@plotfarm.vn',
  },
  copyright:
    '© 2026 PlotFarm Da Lat. Đơn vị tiên phong Farm-to-Home Nông nghiệp Công nghệ cao Đà Lạt.',
  legalLinks: [
    { label: 'Bảo mật thông tin', href: '/privacy' },
    { label: 'Cam kết dịch vụ', href: '/terms' },
    { label: 'Quy định IoT', href: '/iot-regulations' },
  ],
};
