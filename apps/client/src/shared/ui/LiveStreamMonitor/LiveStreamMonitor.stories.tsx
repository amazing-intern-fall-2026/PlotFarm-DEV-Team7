import type { Meta, StoryObj } from "@storybook/react";
import { LiveStreamMonitor } from "./LiveStreamMonitor";

const meta: Meta<typeof LiveStreamMonitor> = {
  title: "Shared/UI/LiveStreamMonitor",
  component: LiveStreamMonitor,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof LiveStreamMonitor>;

export const LiveDemo: Story = {
  args: {
    plotName: "Vườn Thảo Mộc BioFarm Đà Lạt - Lô A1",
    cameraLabel: "CAM-01 • Góc bao quát 360°",
    posterImage: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80",
    isLive: true,
    sensors: [
      { type: "temperature", value: 25.8, unit: "°C" },
      { type: "humidity", value: 74, unit: "%" },
      { type: "soilMoisture", value: 65, unit: "%" },
      { type: "light", value: 5200, unit: "lux" },
      { type: "ph", value: 6.4, unit: "pH" }
    ],
    onSnapshot: () => alert("Đã chụp ảnh lưu vào nhật ký!"),
    onToggleFullscreen: () => alert("Mở toàn màn hình")
  }
};
