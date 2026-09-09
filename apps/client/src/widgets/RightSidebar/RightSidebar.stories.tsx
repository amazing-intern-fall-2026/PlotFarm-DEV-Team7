import type { Meta, StoryObj } from "@storybook/react";
import { RightSidebar } from "./RightSidebar";

const meta: Meta<typeof RightSidebar> = {
  title: "Widgets/RightSidebar",
  component: RightSidebar,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof RightSidebar>;

export const Default: Story = {
  args: {
    onFollowToggle: (id, active) =>
      alert(`Đã toggle theo dõi nông dân ${id}: ${active}`),
    onTagClick: (tag) => alert(`Xem chủ đề #${tag}`)
  }
};
