import type { Meta, StoryObj } from "@storybook/react";
import { ActionButton } from "./ActionButton";

const meta: Meta<typeof ActionButton> = {
  title: "Shared/UI/ActionButton",
  component: ActionButton,
  tags: ["autodocs"],
  argTypes: {
    actionType: {
      control: "select",
      options: ["like", "bookmark", "repost", "share", "follow"]
    },
    isActive: { control: "boolean" },
    count: { control: "number" },
    showCount: { control: "boolean" }
  }
};

export default meta;
type Story = StoryObj<typeof ActionButton>;

export const LikeButton: Story = {
  args: {
    actionType: "like",
    count: 142,
    isActive: false
  }
};

export const BookmarkButton: Story = {
  args: {
    actionType: "bookmark",
    count: 38,
    isActive: true
  }
};

export const RepostButton: Story = {
  args: {
    actionType: "repost",
    count: 19,
    isActive: false
  }
};

export const FollowButton: Story = {
  args: {
    actionType: "follow",
    isActive: false
  }
};

export const InteractionBarDemo: Story = {
  render: () => (
    <div className="flex items-center justify-between max-w-sm rounded-lg border border-border p-3 bg-card shadow-sm">
      <div className="flex items-center gap-1">
        <ActionButton actionType="like" count={256} />
        <ActionButton actionType="repost" count={34} />
        <ActionButton actionType="bookmark" count={89} />
        <ActionButton actionType="share" showCount={false} />
      </div>
      <ActionButton actionType="follow" />
    </div>
  )
};
