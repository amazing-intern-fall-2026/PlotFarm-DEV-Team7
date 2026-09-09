import type { Meta, StoryObj } from "@storybook/react";
import { StoryStrip, StoryItem } from "./StoryStrip";

const sampleStories: StoryItem[] = [
  {
    id: "s-1",
    user: {
      name: "Bác Ba Nông Dân",
      avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80"
    },
    hasUnseen: true
  },
  {
    id: "s-2",
    user: {
      name: "Kỹ Sư Bình",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
    },
    hasUnseen: true
  },
  {
    id: "s-3",
    user: {
      name: "Trang Trại Dâu",
      avatarUrl: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=150&auto=format&fit=crop&q=80"
    },
    hasUnseen: false
  },
  {
    id: "s-4",
    user: {
      name: "Vườn Hoa Lan",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    hasUnseen: true
  },
  {
    id: "s-5",
    user: {
      name: "Nam Ban Farm",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    hasUnseen: false
  }
];

const meta: Meta<typeof StoryStrip> = {
  title: "Widgets/StoryStrip",
  component: StoryStrip,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof StoryStrip>;

export const Default: Story = {
  args: {
    stories: sampleStories,
    currentUser: {
      name: "Tôi",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    onCreateStory: () => alert("Mở trình tạo tin mới!"),
    onSelectStory: (s) => alert(`Xem tin của: ${s.user.name}`)
  }
};
