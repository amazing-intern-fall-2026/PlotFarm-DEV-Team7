import type { Meta, StoryObj } from "@storybook/react";
import { PlotCard } from "./PlotCard";

const meta: Meta<typeof PlotCard> = {
  title: "Shared/UI/PlotCard",
  component: PlotCard,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof PlotCard>;

export const Available: Story = {
  args: {
    id: "plot-01",
    plotCode: "ĐẤT-01",
    name: "Vườn Thảo Mộc Thông Minh Đà Lạt",
    location: "Trại Mát, Phường 11, TP. Đà Lạt",
    areaM2: 50,
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
    status: "available",
    hasCamera: true,
    hasIoT: true,
    pricePerMonth: 1200000,
    originalPrice: 1500000
  }
};

export const Cultivating: Story = {
  args: {
    id: "plot-02",
    plotCode: "ĐẤT-02",
    name: "Nhà Kính Thủy Canh Rau Ăn Lá",
    location: "Lạc Dương, Lâm Đồng",
    areaM2: 75,
    image: "https://images.unsplash.com/photo-1592417817098-8f3d69104a47?auto=format&fit=crop&w=800&q=80",
    status: "cultivating",
    hasCamera: true,
    hasIoT: true,
    pricePerMonth: 1800000
  }
};

export const Reserved: Story = {
  args: {
    id: "plot-03",
    plotCode: "ĐẤT-03",
    name: "Mảnh Vườn Sinh Thái Ba Vì",
    location: "Vân Hòa, Ba Vì, Hà Nội",
    areaM2: 100,
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
    status: "reserved",
    hasCamera: false,
    hasIoT: true,
    pricePerMonth: 2200000
  }
};
