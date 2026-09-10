import type { Meta, StoryObj } from "@storybook/react";
import { CheckCircle2, AlertTriangle, XCircle, Leaf } from "lucide-react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Shared/UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "success", "warning", "destructive", "outline"],
      description: "Visual variant of the badge"
    }
  }
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Đang Canh Tác",
    variant: "default"
  }
};

export const Secondary: Story = {
  args: {
    children: "Sắp Thu Hoạch",
    variant: "secondary"
  }
};

export const Success: Story = {
  args: {
    children: "Đã Hoàn Thành",
    variant: "success",
    icon: <CheckCircle2 className="h-3 w-3" />
  }
};

export const Warning: Story = {
  args: {
    children: "Cần Tưới Nước",
    variant: "warning",
    icon: <AlertTriangle className="h-3 w-3" />
  }
};

export const Destructive: Story = {
  args: {
    children: "Cảnh Báo Sâu Bệnh",
    variant: "destructive",
    icon: <XCircle className="h-3 w-3" />
  }
};

export const Outline: Story = {
  args: {
    children: "Cà Chua Bi",
    variant: "outline",
    icon: <Leaf className="h-3 w-3 text-primary" />
  }
};

export const AllBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Đang Canh Tác</Badge>
      <Badge variant="secondary">Sắp Thu Hoạch</Badge>
      <Badge variant="success" icon={<CheckCircle2 className="h-3 w-3" />}>
        Đạt Tiêu Chuẩn VietGAP
      </Badge>
      <Badge variant="warning" icon={<AlertTriangle className="h-3 w-3" />}>
        Độ Ẩm Thấp
      </Badge>
      <Badge variant="destructive" icon={<XCircle className="h-3 w-3" />}>
        Quá Hạn Thuê
      </Badge>
      <Badge variant="outline" icon={<Leaf className="h-3 w-3 text-primary" />}>
        Đất Hữu Cơ
      </Badge>
    </div>
  )
};
