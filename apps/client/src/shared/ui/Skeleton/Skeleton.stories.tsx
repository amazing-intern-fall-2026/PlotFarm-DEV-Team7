import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton, PostCardSkeleton, ProfileSkeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Shared/UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
### 📌 Giới thiệu Component
**Skeleton** là khối placeholder tạo hiệu ứng nhấp nháy chuyển màu (shimmer pulse), mô phỏng hình khối bố cục của dữ liệu đang chờ nạp từ server.

#### Mục đích sử dụng:
- Giảm cảm giác chờ đợi của người dùng khi gọi API dữ liệu lớn.
- Tránh hiện tượng giật cục giao diện (Cumulative Layout Shift - CLS) khi dữ liệu xuất hiện.
- Kết hợp hoàn hảo trong component \`StateView\` với \`variant="skeleton"\`.

#### Cách truyền biến (Props & Usage):
\`\`\`tsx
import { Skeleton } from "@/shared/ui";

// Giả lập 1 dòng tiêu đề và 1 đoạn mô tả
<div className="space-y-2">
  <Skeleton className="h-6 w-48 rounded" />
  <Skeleton className="h-4 w-full rounded" />
  <Skeleton className="h-4 w-3/4 rounded" />
</div>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    className: {
      control: "text",
      description: "Class Tailwind tùy biến chiều cao (h-*), chiều rộng (w-*) và bo góc (rounded-*) của khối placeholder"
    }
  }
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const BasePrimitives: Story = {
  name: "1. Các Khối Cơ Bản (Primitives)",
  render: () => (
    <div className="space-y-3 max-w-sm">
      <div className="flex items-center space-x-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-32 w-full rounded-xl" />
    </div>
  )
};

export const PlotCardSkeletonExample: Story = {
  name: "2. Skeleton Thẻ Thửa Đất Nông Nghiệp",
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
      <PostCardSkeleton />
      <PostCardSkeleton />
    </div>
  )
};

export const ProfileSkeletonExample: Story = {
  name: "3. Skeleton Hồ Sơ Tài Khoản",
  render: () => (
    <div className="max-w-md">
      <ProfileSkeleton />
    </div>
  )
};
