import type { Meta, StoryObj } from "@storybook/react";
import { UserHoverCard } from "./UserHoverCard";

const meta: Meta<typeof UserHoverCard> = {
  title: "Shared/UI/UserHoverCard",
  component: UserHoverCard,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof UserHoverCard>;

const sampleFarmer = {
  id: "u-1",
  name: "Bác Ba Nông Dân",
  handle: "bacba_dalat",
  avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
  isVerified: true,
  verifiedType: "farmer" as const,
  bio: "Chuyên canh cà chua bi & ớt chuông chuẩn VietGAP tại Đà Lạt. 15 năm kinh nghiệm nông nghiệp thông minh.",
  location: "Cầu Đất, TP. Đà Lạt, Lâm Đồng",
  followingCount: 148,
  followersCount: 3820,
  activePlotsCount: 4,
  isFollowing: false
};

export const Default: Story = {
  args: {
    user: sampleFarmer,
    children: (
      <span className="font-semibold text-primary hover:underline cursor-pointer">
        @bacba_dalat (Di chuột vào đây)
      </span>
    )
  }
};
