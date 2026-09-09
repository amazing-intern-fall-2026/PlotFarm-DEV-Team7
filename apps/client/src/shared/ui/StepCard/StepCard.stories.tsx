import type { Meta, StoryObj } from "@storybook/react";
import { MapPin, Sprout, Video, PackageCheck } from "lucide-react";
import { StepCard } from "./StepCard";

const meta: Meta<typeof StepCard> = {
  title: "Shared/UI/StepCard",
  component: StepCard,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof StepCard>;

export const Step1: Story = {
  args: {
    stepNumber: "01",
    title: "Chọn mảnh đất canh tác",
    description: "Lựa chọn vị trí đất, diện tích và mô hình nhà kính phù hợp theo nhu cầu gia đình bạn.",
    icon: <MapPin className="h-6 w-6" />,
    isActive: true
  }
};

export const Step2: Story = {
  args: {
    stepNumber: "02",
    title: "Lên thực đơn gieo giống",
    description: "Tùy chọn danh mục rau củ hữu cơ 100% không hóa chất cho kỹ sư gieo trồng.",
    icon: <Sprout className="h-6 w-6" />
  }
};

export const Step3: Story = {
  args: {
    stepNumber: "03",
    title: "Giám sát 24/7 từ xa",
    description: "Xem camera trực tiếp và theo dõi các chỉ số đất, nhiệt độ qua ứng dụng mọi lúc mọi nơi.",
    icon: <Video className="h-6 w-6" />
  }
};

export const Step4: Story = {
  args: {
    stepNumber: "04",
    title: "Nhận nông sản tươi tận nhà",
    description: "Rau được thu hoạch sáng sớm và giao tới bàn ăn gia đình bạn trong vòng 24 giờ.",
    icon: <PackageCheck className="h-6 w-6" />
  }
};
