import type { Meta, StoryObj } from "@storybook/react";
import { CropCard } from "./CropCard";

const meta: Meta<typeof CropCard> = {
  title: "Shared/UI/CropCard",
  component: CropCard,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof CropCard>;

export const Default: Story = {
  args: {
    cropId: "c1",
    name: "Xà Lách Lô Lô Xanh Đà Lạt",
    category: "Rau ăn lá hữu cơ",
    image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=600&q=80",
    growTimeWeeks: 4,
    yieldKg: "12-15",
    price: 180000,
    tags: ["100% Hữu cơ", "Thu hoạch sớm"],
    isSelected: false
  }
};

export const Selected: Story = {
  args: {
    cropId: "c2",
    name: "Cà Chua Bi Cherry Vàng",
    category: "Củ quả ngọt",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
    growTimeWeeks: 8,
    yieldKg: "25-30",
    price: 320000,
    tags: ["Giàu Vitamin", "Đặc sản"],
    isSelected: true
  }
};
