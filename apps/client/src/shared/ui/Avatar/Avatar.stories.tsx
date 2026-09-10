import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Shared/UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"]
    },
    status: {
      control: "select",
      options: ["none", "online", "offline", "busy", "story-active"]
    }
  }
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    name: "Nguyễn Văn An",
    size: "md",
    status: "online"
  }
};

export const WithImage: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    name: "Trần Thị Mai",
    size: "lg",
    status: "online"
  }
};

export const StoryActive: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    name: "Bác Ba Nông Dân",
    size: "lg",
    status: "story-active"
  }
};

export const FallbackInitials: Story = {
  args: {
    name: "Lê Hoàng Phúc",
    size: "md",
    status: "offline"
  }
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="Phạm Minh" size="sm" status="online" />
      <Avatar name="Phạm Minh" size="md" status="busy" />
      <Avatar name="Phạm Minh" size="lg" status="story-active" />
      <Avatar name="Phạm Minh" size="xl" status="online" />
    </div>
  )
};
