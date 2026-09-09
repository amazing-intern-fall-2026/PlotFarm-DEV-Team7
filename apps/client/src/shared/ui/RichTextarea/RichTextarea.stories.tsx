import type { Meta, StoryObj } from "@storybook/react";
import { RichTextarea } from "./RichTextarea";

const meta: Meta<typeof RichTextarea> = {
  title: "Shared/UI/RichTextarea",
  component: RichTextarea,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof RichTextarea>;

export const Default: Story = {
  args: {
    placeholder: "Hôm nay nông trại của bạn thế nào? Hãy chia sẻ với cộng đồng...",
    maxCharacters: 500
  }
};

export const WithLinkPreview: Story = {
  args: {
    defaultValue: "Vừa cập nhật kỹ thuật tưới nhỏ giọt tiết kiệm 40% nước cho vườn cà chua #NongNghiepSach @bacba_dalat",
    linkPreview: {
      url: "https://plotfarm.vn/blog/tiet-kiem-nuoc-voi-tuoi-nho-giot",
      title: "Cẩm nang triển khai hệ thống tưới nhỏ giọt tự động chuẩn Israel",
      description: "Hướng dẫn chi tiết từ khâu thiết kế đường ống, béc tưới đến việc cài đặt bộ hẹn giờ thông minh.",
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=300&auto=format&fit=crop&q=80",
      domain: "plotfarm.vn"
    },
    maxCharacters: 300
  }
};
