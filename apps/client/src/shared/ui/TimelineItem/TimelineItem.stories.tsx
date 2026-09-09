import type { Meta, StoryObj } from "@storybook/react";
import { TimelineItem } from "./TimelineItem";

const meta: Meta<typeof TimelineItem> = {
  title: "Shared/UI/TimelineItem",
  component: TimelineItem,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof TimelineItem>;

export const Default: Story = {
  args: {
    date: "08:30 - 08/09/2026",
    stage: "Bón phân hữu cơ đợt 2",
    title: "Bổ sung dinh dưỡng trùn quế & tưới ẩm nhỏ giọt",
    description: "Cây phát triển đồng đều, đã xuất hiện 4-5 tầng lá thật khỏe mạnh. Đo độ ẩm đất đạt 78%, độ pH ổn định ở mức 6.5.",
    engineer: {
      name: "Nguyễn Văn Hùng",
      role: "Kỹ sư trưởng Đà Lạt"
    },
    images: [
      "https://images.unsplash.com/photo-1592417817098-8f3d69104a47?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=300&q=80"
    ],
    isLast: false
  }
};
