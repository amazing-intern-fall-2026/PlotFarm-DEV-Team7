import type { Meta, StoryObj } from "@storybook/react";
import { SensorPill } from "./SensorPill";

const meta: Meta<typeof SensorPill> = {
  title: "Shared/UI/SensorPill",
  component: SensorPill,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["temperature", "humidity", "soilMoisture", "light", "ph", "co2", "custom"]
    },
    status: {
      control: "select",
      options: ["normal", "warning", "alert"]
    },
    variant: {
      control: "select",
      options: ["default", "compact", "overlay"]
    }
  }
};

export default meta;
type Story = StoryObj<typeof SensorPill>;

export const Temperature: Story = {
  args: {
    type: "temperature",
    value: 26.5,
    unit: "°C",
    status: "normal",
    variant: "default"
  }
};

export const CompactPill: Story = {
  args: {
    type: "soilMoisture",
    value: 78,
    unit: "%",
    variant: "compact"
  }
};

export const VideoOverlay: Story = {
  args: {
    type: "humidity",
    value: 65,
    unit: "%",
    variant: "overlay"
  },
  parameters: {
    backgrounds: { default: "dark" }
  }
};
