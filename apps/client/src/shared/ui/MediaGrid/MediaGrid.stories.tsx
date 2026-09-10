import type { Meta, StoryObj } from "@storybook/react";
import { MediaGrid } from "./MediaGrid";

const sampleImages = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop&q=80",
    alt: "Vườn rau thủy canh xà lách Romaine"
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=800&auto=format&fit=crop&q=80",
    alt: "Ớt chuông chuỗi Đà Lạt"
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=800&auto=format&fit=crop&q=80",
    alt: "Thu hoạch dâu tây hữu cơ"
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&auto=format&fit=crop&q=80",
    alt: "Cà chua bi vàng ngọt"
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
    alt: "Hệ thống tưới tự động"
  }
];

const meta: Meta<typeof MediaGrid> = {
  title: "Shared/UI/MediaGrid",
  component: MediaGrid,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof MediaGrid>;

export const SingleImage: Story = {
  args: {
    items: [sampleImages[0]]
  }
};

export const TwoImages: Story = {
  args: {
    items: sampleImages.slice(0, 2)
  }
};

export const ThreeImages: Story = {
  args: {
    items: sampleImages.slice(0, 3)
  }
};

export const FourImages: Story = {
  args: {
    items: sampleImages.slice(0, 4)
  }
};

export const FiveOrMoreImages: Story = {
  args: {
    items: sampleImages
  }
};
