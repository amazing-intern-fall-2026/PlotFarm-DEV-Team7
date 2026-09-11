import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { Input, Button } from '@/shared/ui';
import { Search, Plus, QrCode, AlertTriangle } from 'lucide-react';

const meta: Meta<typeof Header> = {
  title: 'Widgets/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
### 🧭 Reusable Multi-Role Header Widget

Thành phần Header dùng chung đa vai trò (**Customer**, **Farmer / Field Ops**, **Admin**), tuân thủ nghiêm ngặt tiêu chuẩn Feature-Sliced Design (FSD Layer 3: Widgets):
- **Giao diện đồng nhất & thân thiện**: Phong cách sáng, thanh thoát, trang nhã, tối ưu nhận diện thương hiệu PlotFarm.
- **Tùy biến linh hoạt theo vai trò**: Hỗ trợ slot tìm kiếm, slot thao tác nhanh, huy hiệu trạng thái ca trực và menu người dùng.
- **Tối giản icon & màu sắc**: Không lạm dụng icon hay màu tối gắt, giữ trải nghiệm trực quan, dễ chịu.
- **Tuyệt đối không có**: Chuyển đổi ngôn ngữ thừa và Role switcher trên UI người dùng theo đúng yêu cầu bài toán.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['customer', 'farmer', 'admin'],
      description: 'Chế độ giao diện đặc thù theo từng vai trò'
    },
    notificationCount: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Số lượng thông báo chưa đọc trên biểu tượng chuông'
    },
    showBack: {
      control: 'boolean',
      description: 'Hiển thị nút quay lại (Back) trên mobile hoặc trang chi tiết'
    },
    title: {
      control: 'text',
      description: 'Tiêu đề / Phân hệ hiển thị trên Header'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Header>;

/**
 * 1. Giao diện Khách hàng vãng lai (Guest - Chưa đăng nhập)
 */
export const CustomerGuest: Story = {
  args: {
    variant: 'customer',
    user: null,
    notificationCount: 0
  }
};

/**
 * 2. Giao diện Khách hàng đã đăng nhập (Customer Portal)
 */
export const CustomerAuthenticated: Story = {
  args: {
    variant: 'customer',
    user: {
      id: 'cust-1',
      fullName: 'Nguyễn Thu Hà',
      email: 'thuha.nguyen@gmail.com',
      role: 'CUSTOMER',
      status: 'online',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
    },
    notificationCount: 3,
    navigation: [
      { label: 'Trang chủ', href: '/', isActive: true },
      { label: 'Gói thuê đất', href: '/plots' },
      { label: 'Mảnh vườn của tôi', href: '/customer/my-plots', badge: '1 ô' },
      { label: 'Cây trồng', href: '/crops' },
      { label: 'Về PlotFarm', href: '/about' }
    ]
  }
};

/**
 * 3. Giao diện Nông dân & Kỹ thuật viên (Farmer / Field Operations)
 */
export const FarmerOperations: Story = {
  args: {
    variant: 'farmer',
    title: 'Đội 1 • Khu Vực Đà Lạt',
    subtitle: 'Hệ thống vận hành thực nghiệm BioCloud Field Ops',
    user: {
      id: 'farmer-1',
      fullName: 'Bác Bảy (Trưởng Đội)',
      email: 'bacbay.farmer@plotfarm.vn',
      role: 'STAFF',
      status: 'online',
      statusText: 'Đang làm việc',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    notificationCount: 5,
    actionsSlot: (
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-2.5 text-xs text-foreground border-border hover:bg-muted"
        >
          <QrCode className="h-3.5 w-3.5 mr-1 text-primary" /> Quét QR
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="h-8 px-2.5 text-xs bg-red-600 hover:bg-red-700 text-white shadow-xs"
        >
          <AlertTriangle className="h-3.5 w-3.5 mr-1" /> Báo sự cố
        </Button>
      </div>
    )
  }
};

/**
 * 4. Giao diện Quản trị viên (Admin Portal)
 */
export const AdminSystem: Story = {
  args: {
    variant: 'admin',
    title: 'Tổng Quan Vận Hành & Doanh Số',
    subtitle: 'Nền tảng kiểm soát nông trại tự động v2.4',
    user: {
      id: 'admin-1',
      fullName: 'Lê Hoàng Ân',
      email: 'admin.an@plotfarm.vn',
      role: 'ADMIN',
      status: 'online',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
    },
    notificationCount: 12,
    searchSlot: (
      <div className="relative w-64">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input
          placeholder="Tìm thửa đất, khách hàng..."
          className="h-8 pl-8 pr-3 text-xs bg-muted/40 border-input text-foreground placeholder:text-muted-foreground focus:border-primary"
        />
      </div>
    ),
    actionsSlot: (
      <Button
        variant="default"
        size="sm"
        className="h-8 px-3 text-xs font-semibold shadow-xs"
      >
        <Plus className="h-3.5 w-3.5 mr-1" /> Thửa đất mới
      </Button>
    )
  }
};
