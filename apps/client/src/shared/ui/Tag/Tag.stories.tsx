import type { Meta, StoryObj } from "@storybook/react";
import { VerifiedBadge, NotificationBadge, CategoryTag } from "./Tag";

const meta: Meta = {
  title: "Shared/UI/Tag & Badges",
  tags: ["autodocs"]
};

export default meta;

export const VerifiedBadges: StoryObj = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1.5 text-sm font-semibold">
        <span>Bác Ba Nông Dân</span>
        <VerifiedBadge variant="farmer" />
      </div>
      <div className="flex items-center gap-1.5 text-sm font-semibold">
        <span>TS. Lê Văn Kỹ Thuật</span>
        <VerifiedBadge variant="expert" />
      </div>
      <div className="flex items-center gap-1.5 text-sm font-semibold">
        <span>PlotFarm Official</span>
        <VerifiedBadge variant="standard" />
      </div>
    </div>
  )
};

export const NotificationBadges: StoryObj = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="relative inline-block p-2 bg-muted rounded-lg">
        <span className="text-sm font-medium">Tin nhắn</span>
        <NotificationBadge count={5} className="absolute -top-1 -right-1" />
      </div>
      <div className="relative inline-block p-2 bg-muted rounded-lg">
        <span className="text-sm font-medium">Thông báo</span>
        <NotificationBadge count={120} className="absolute -top-1 -right-1" />
      </div>
      <div className="relative inline-block p-2 bg-muted rounded-lg">
        <span className="text-sm font-medium">Cập nhật</span>
        <NotificationBadge dot className="absolute top-1 right-1" />
      </div>
    </div>
  )
};

export const CategoryTags: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <CategoryTag label="SauBenh" count={128} isActive />
      <CategoryTag label="ThuyCanh" count={85} />
      <CategoryTag label="HuuCo" count={240} />
      <CategoryTag label="GiaNongSan" count={52} />
      <CategoryTag label="KinhNghiem" count={310} />
    </div>
  )
};
