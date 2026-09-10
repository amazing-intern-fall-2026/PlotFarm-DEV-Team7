import type { Meta, StoryObj } from "@storybook/react";
import { OrderSummary } from "./OrderSummary";

const meta: Meta<typeof OrderSummary> = {
  title: "Shared/UI/OrderSummary",
  component: OrderSummary,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof OrderSummary>;

export const Default: Story = {
  args: {
    plotName: "Vườn Thảo Mộc BioGreen Đà Lạt",
    plotCode: "ĐẤT-01",
    location: "Trại Mát, Đà Lạt, Lâm Đồng",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80",
    durationMonths: 3,
    items: [
      { label: "Tiền thuê mảnh đất (3 tháng x 1.200.000 đ)", amount: 3600000 },
      { label: "Gói phân bón hữu cơ & hạt giống xà lách", amount: 450000 },
      { label: "Phí kỹ sư giám sát & báo cáo nhật ký 24/7", amount: 300000 }
    ],
    discountAmount: 200000,
    onApplyVoucher: (code) => alert(`Áp dụng mã: ${code}`)
  }
};
