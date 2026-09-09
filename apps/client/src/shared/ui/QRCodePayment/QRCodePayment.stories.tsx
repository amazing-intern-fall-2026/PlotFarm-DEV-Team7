import type { Meta, StoryObj } from "@storybook/react";
import { QRCodePayment } from "./QRCodePayment";

const meta: Meta<typeof QRCodePayment> = {
  title: "Shared/UI/QRCodePayment",
  component: QRCodePayment,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof QRCodePayment>;

export const Default: Story = {
  args: {
    bankName: "Ngân hàng Quân Đội (MB Bank)",
    accountNumber: "0987654321",
    accountHolder: "CTY CP CONG NGHE PLOTFARM",
    amount: 1850000,
    orderCode: "PF-98421",
    expiresInSeconds: 600,
    onConfirmTransfer: () => alert("Hệ thống đang kiểm tra giao dịch qua Webhook SeAPay/VietQR!"),
    onCancel: () => alert("Hủy thanh toán")
  }
};
