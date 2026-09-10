import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./EmptyState";

const meta: Meta<typeof EmptyState> = {
  title: "Shared/UI/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  argTypes: {
    preset: {
      control: "select",
      options: ["feed", "notification", "search", "general"]
    }
  }
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const FeedEmpty: Story = {
  args: {
    preset: "feed",
    onAction: () => alert("Mở modal tạo bài viết mới!")
  }
};

export const NotificationEmpty: Story = {
  args: {
    preset: "notification"
  }
};

export const SearchEmpty: Story = {
  args: {
    preset: "search",
    onAction: () => alert("Xóa bộ lọc tìm kiếm")
  }
};
