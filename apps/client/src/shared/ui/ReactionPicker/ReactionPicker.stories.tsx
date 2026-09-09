import type { Meta, StoryObj } from "@storybook/react";
import { ReactionPicker } from "./ReactionPicker";

const meta: Meta<typeof ReactionPicker> = {
  title: "Shared/UI/ReactionPicker",
  component: ReactionPicker,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof ReactionPicker>;

export const Default: Story = {
  args: {
    onSelect: (reaction) => alert(`Đã chọn biểu cảm: ${reaction}`)
  }
};
