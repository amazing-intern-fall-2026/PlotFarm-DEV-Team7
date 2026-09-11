import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Widgets/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
### 🌾 Unified Global Footer Widget

Chân trang dùng chung của **PlotFarm** (FSD Layer 3: Widgets), tuân thủ thiết kế Figma chuẩn:
- **4 Cột thông tin**: Nhận diện thương hiệu & Chứng nhận chất lượng, Quy trình & Canh tác, Hỗ trợ & Chính sách, Thông tin liên hệ nông trại Đà Lạt.
- **Không fix cứng chuỗi**: Tự động lấy cấu hình từ hệ thống đa ngữ \`i18n\` hoặc prop \`config\`.
- **Thân thiện & Tinh tế**: Tối ưu khoảng cách, tone màu sáng dịu nhẹ, đáp ứng tốt trên mobile, tablet lẫn desktop.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};

export const CustomConfig: Story = {
  args: {
    config: {
      description: 'Nông trại công nghệ cao thực nghiệm tại Đà Lạt - Cung cấp nông sản sạch tận bàn ăn.',
      badges: ['VietGAP 2026', 'BioCloud 4.0'],
      columns: [
        {
          title: 'Khám Phá',
          links: [
            { label: 'Các thửa đất mở bán', href: '/plots' },
            { label: 'Danh mục cây giống', href: '/crops' },
          ],
        },
      ],
      contact: {
        title: 'Liên Hệ Hợp Tác',
        address: 'Thung lũng rau sạch Đà Lạt, Lâm Đồng',
        hotline: '1900 8888',
        email: 'contact@plotfarm.vn',
      },
      copyright: '© 2026 PlotFarm. All rights reserved.',
      legalLinks: [
        { label: 'Điều khoản bảo mật', href: '/privacy' },
        { label: 'Quy định sàn', href: '/terms' },
      ],
    },
  },
};
