import type { Meta, StoryObj } from "@storybook/react";
import { HeaderTopBar } from "./HeaderTopBar";

const meta: Meta<typeof HeaderTopBar> = {
  title: "Widgets/HeaderTopBar",
  component: HeaderTopBar,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof HeaderTopBar>;

export const Default: Story = {
  args: {
    currentUser: {
      name: "Bác Ba Nông Dân",
      avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80"
    },
    notificationCount: 4,
    onNewPostClick: () => alert("Mở modal đăng bài"),
    onNotificationsClick: () => alert("Mở dropdown thông báo")
  }
};
