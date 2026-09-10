import type { Meta, StoryObj } from "@storybook/react";
import { PlotFilterBar } from "./PlotFilterBar";

const meta: Meta<typeof PlotFilterBar> = {
  title: "Shared/UI/PlotFilterBar",
  component: PlotFilterBar,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof PlotFilterBar>;

export const Default: Story = {
  args: {
    selectedLocation: "Đà Lạt, Lâm Đồng",
    selectedArea: "all",
    selectedFarmingType: "all",
    onlyAvailable: true,
    onReset: () => console.log("Reset filters")
  }
};
