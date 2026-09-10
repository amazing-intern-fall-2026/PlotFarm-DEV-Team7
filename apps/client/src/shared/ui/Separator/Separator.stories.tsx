import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./Separator";

const meta: Meta<typeof Separator> = {
  title: "Shared/UI/Separator",
  component: Separator,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <div>
        <h4 className="text-sm font-medium leading-none">Nông Trại PlotFarm</h4>
        <p className="text-sm text-muted-foreground mt-1">
          Hệ sinh thái kết nối chủ đất nông nghiệp và người thuê.
        </p>
      </div>
      <Separator />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Trang chủ</div>
        <Separator orientation="vertical" />
        <div>Danh sách đất</div>
        <Separator orientation="vertical" />
        <div>Tài liệu</div>
      </div>
    </div>
  )
};
