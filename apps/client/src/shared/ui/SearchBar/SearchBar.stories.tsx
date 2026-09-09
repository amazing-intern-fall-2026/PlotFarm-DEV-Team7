import type { Meta, StoryObj } from "@storybook/react";
import { SearchBar } from "./SearchBar";

const meta: Meta<typeof SearchBar> = {
  title: "Shared/UI/SearchBar",
  component: SearchBar,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    placeholder: "Tìm kiếm bài viết, nông dân, thửa đất..."
  }
};

export const WithSuggestions: Story = {
  args: {
    value: "cà chua",
    suggestions: [
      {
        id: "1",
        type: "trending",
        title: "#CaChuaBiDaLat",
        subtitle: "1.4k bài thảo luận tuần này"
      },
      {
        id: "2",
        type: "user",
        title: "Trang Trại Cà Chua Thủy Canh Nam Ban",
        subtitle: "@farm_cachuabi · Lâm Hà, Lâm Đồng"
      },
      {
        id: "3",
        type: "history",
        title: "Kỹ thuật bấm ngọn tỉa cành cà chua vô hạn",
        subtitle: "Lịch sử tìm kiếm hôm qua"
      }
    ]
  }
};
