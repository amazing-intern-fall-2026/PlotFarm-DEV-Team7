import type { Meta, StoryObj } from "@storybook/react";
import { State } from "./State";
import { Button } from "../Button";
import { Plus } from "lucide-react";

const meta: Meta<typeof State> = {
  title: "Shared/UI/State",
  component: State,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
### 📌 Giới thiệu Component
**State** là component trung tâm **hợp nhất 4 trạng thái cốt lõi** (\`loading\`, \`fetching\`, \`empty\`, \`error\`) của toàn bộ hệ thống PlotFarm. Component này thay thế hoàn toàn các component rời rạc (EmptyState, ErrorBoundary riêng lẻ) để bảo đảm giao diện nhất quán 100%.

#### Các trạng thái hỗ trợ:
1. \`loading\`: Tải lần đầu tiên (hiển thị spinner lớn toàn trang, khung card hoặc skeleton).
2. \`fetching\`: Làm mới dữ liệu nền (background refetch) — vẫn hiển thị dữ liệu cũ kèm indicator nhỏ ở góc.
3. \`empty\`: Dữ liệu rỗng (kèm preset icon theo ngữ cảnh như plots, contracts, notifications).
4. \`error\`: Báo lỗi mạng/API kèm nút 'Thử lại' (\`onRetry\`).
5. \`idle\` / \`success\`: Render \`children\` bình thường.

#### Cách truyền biến (Props & Usage):
\`\`\`tsx
import { State, Button } from "@/shared/ui";

<State
  state={isLoading ? "loading" : isError ? "error" : data.length === 0 ? "empty" : "idle"}
  variant="card"
  emptyPreset="plots"
  error={error?.message}
  onRetry={refetch}
  action={<Button>Đăng ký thuê đất ngay</Button>}
>
  <PlotListView plots={data} />
</State>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    state: {
      control: "select",
      options: ["idle", "loading", "fetching", "empty", "error", "success"],
      description: "Trạng thái hiển thị hiện tại của luồng dữ liệu",
      table: {
        defaultValue: { summary: "idle" }
      }
    },
    variant: {
      control: "select",
      options: ["full-page", "card", "inline", "skeleton"],
      description: "Bố cục hiển thị: full-page (toàn màn hình), card (trong khung thẻ viền), inline (tối giản không viền), skeleton (khung xám shimmer)",
      table: {
        defaultValue: { summary: "card" }
      }
    },
    emptyPreset: {
      control: "select",
      options: ["general", "search", "notification", "feed", "plots", "contracts"],
      description: "Bộ preset icon và văn bản mặc định cho trạng thái rỗng",
      table: {
        defaultValue: { summary: "general" }
      }
    },
    skeletonLines: {
      control: "number",
      description: "Số dòng skeleton khi variant='skeleton'",
      table: {
        defaultValue: { summary: "3" }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof State>;

export const LoadingFullPage: Story = {
  name: "1. Loading Toàn Trang (Full-Page)",
  args: {
    state: "loading",
    variant: "full-page",
    title: "Đang tải hệ thống nông trại...",
    description: "Đang kết nối đến máy chủ IoT và nạp dữ liệu thửa đất..."
  }
};

export const LoadingCard: Story = {
  name: "2. Loading Trong Card (Card Variant)",
  args: {
    state: "loading",
    variant: "card",
    title: "Đang đồng bộ cảm biến...",
    description: "Dữ liệu nhiệt độ và độ ẩm đất đang được cập nhật."
  }
};

export const LoadingSkeleton: Story = {
  name: "3. Loading Dạng Skeleton (Shimmer)",
  args: {
    state: "loading",
    variant: "skeleton",
    skeletonLines: 4
  }
};

export const BackgroundFetching: Story = {
  name: "4. Fetching Ngầm (Background Refresh)",
  args: {
    state: "fetching",
    children: (
      <div className="p-6 border border-border rounded-xl bg-card">
        <h3 className="font-bold text-base text-foreground">Dữ liệu thửa đất Lô A-12 (Đang làm mới)</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Nội dung cũ vẫn hiển thị bình thường cho người dùng trong lúc dữ liệu mới đang được nạp ở chế độ nền.
        </p>
      </div>
    )
  }
};

export const EmptyPlotsPreset: Story = {
  name: "5. Empty State (Preset Thửa Đất)",
  args: {
    state: "empty",
    emptyPreset: "plots",
    action: (
      <Button leftIcon={<Plus className="h-4 w-4" />}>
        Đăng Ký Thuê Đất Mới
      </Button>
    )
  }
};

export const EmptySearchPreset: Story = {
  name: "6. Empty State (Preset Tìm Kiếm)",
  args: {
    state: "empty",
    emptyPreset: "search",
    title: "Không tìm thấy thửa đất phù hợp",
    description: "Vui lòng thử tìm với từ khóa khác như 'Cầu Đất', 'Đà Lạt' hoặc 'Xà lách'."
  }
};

export const ErrorWithRetry: Story = {
  name: "7. Error State (Kèm Nút Thử Lại)",
  args: {
    state: "error",
    title: "Không Thể Kết Nối Đến Cảm Biến IoT",
    error: "Máy chủ trả về mã lỗi 503 Service Unavailable. Trạm đo thời tiết tại Cầu Đất tạm thời mất tín hiệu mạng.",
    onRetry: () => alert("Thực hiện gọi lại API...")
  }
};
