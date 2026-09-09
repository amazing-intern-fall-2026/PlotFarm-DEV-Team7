import type { Meta, StoryObj } from "@storybook/react";
import { PriceDisplay } from "./PriceDisplay";

const meta: Meta<typeof PriceDisplay> = {
  title: "Shared/UI/PriceDisplay",
  component: PriceDisplay,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"]
    },
    highlight: {
      control: "boolean"
    }
  }
};

export default meta;
type Story = StoryObj<typeof PriceDisplay>;

export const Default: Story = {
  args: {
    amount: 1200000,
    period: "/tháng",
    size: "md"
  }
};

export const HighlightLg: Story = {
  args: {
    amount: 1850000,
    period: "/tháng",
    size: "lg",
    highlight: true
  }
};

export const WithDiscount: Story = {
  args: {
    amount: 1500000,
    originalAmount: 1900000,
    period: "/tháng",
    size: "xl",
    highlight: true
  }
};
