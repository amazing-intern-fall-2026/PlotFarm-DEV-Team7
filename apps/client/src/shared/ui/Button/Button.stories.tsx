import type { Meta, StoryObj } from "@storybook/react";
import { Sprout, ArrowRight, Trash2, Plus } from "lucide-react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Shared/UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "secondary", "destructive", "outline", "ghost", "link"],
      description: "Visual style variant of the button"
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "Size of the button"
    },
    isLoading: {
      control: "boolean",
      description: "Show loading spinner and disable interaction"
    },
    disabled: {
      control: "boolean",
      description: "Disable the button"
    }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Thuê Mảnh Đất",
    variant: "primary",
    size: "default"
  }
};

export const Secondary: Story = {
  args: {
    children: "Thu Hoạch Nông Sản",
    variant: "secondary",
    size: "default"
  }
};

export const Outline: Story = {
  args: {
    children: "Xem Chi Tiết",
    variant: "outline",
    size: "default"
  }
};

export const Ghost: Story = {
  args: {
    children: "Hủy Bỏ",
    variant: "ghost",
    size: "default"
  }
};

export const Destructive: Story = {
  args: {
    children: "Xóa Mảnh Đất",
    variant: "destructive",
    size: "default",
    leftIcon: <Trash2 className="h-4 w-4" />
  }
};

export const WithIcons: Story = {
  args: {
    children: "Tạo Mảnh Đất Mới",
    variant: "primary",
    size: "default",
    leftIcon: <Plus className="h-4 w-4" />,
    rightIcon: <ArrowRight className="h-4 w-4" />
  }
};

export const Loading: Story = {
  args: {
    children: "Đang Xử Lý...",
    variant: "primary",
    size: "default",
    isLoading: true
  }
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm" leftIcon={<Sprout className="h-3.5 w-3.5" />}>
        Nhỏ (sm)
      </Button>
      <Button size="default" leftIcon={<Sprout className="h-4 w-4" />}>
        Vừa (default)
      </Button>
      <Button size="lg" leftIcon={<Sprout className="h-5 w-5" />}>
        Lớn (lg)
      </Button>
      <Button size="icon" aria-label="Sprout icon">
        <Sprout className="h-4 w-4" />
      </Button>
    </div>
  )
};
