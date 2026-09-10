import type { Meta, StoryObj } from "@storybook/react";
import { Search, Mail, Eye, MapPin } from "lucide-react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Shared/UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    hint: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" }
  }
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "Tên nông trại",
    placeholder: "Nhập tên trang trại (ví dụ: Nông Trại Xanh Đà Lạt)",
    hint: "Tên hiển thị công khai cho khách thuê"
  }
};

export const SearchInput: Story = {
  args: {
    placeholder: "Tìm kiếm mảnh đất theo vị trí, diện tích...",
    leftIcon: <Search className="h-4 w-4" />
  }
};

export const WithIcons: Story = {
  args: {
    label: "Email liên hệ",
    placeholder: "farmer@plotfarm.vn",
    leftIcon: <Mail className="h-4 w-4" />
  }
};

export const Password: Story = {
  args: {
    label: "Mật khẩu",
    type: "password",
    placeholder: "••••••••",
    rightIcon: <Eye className="h-4 w-4 cursor-pointer hover:text-foreground" />
  }
};

export const WithError: Story = {
  args: {
    label: "Diện tích thửa đất (m²)",
    placeholder: "Nhập số diện tích",
    defaultValue: "-50",
    error: "Diện tích đất phải lớn hơn 0"
  }
};

export const Disabled: Story = {
  args: {
    label: "Mã định danh thửa đất",
    defaultValue: "PLOT-DALAT-042",
    disabled: true,
    leftIcon: <MapPin className="h-4 w-4" />
  }
};
