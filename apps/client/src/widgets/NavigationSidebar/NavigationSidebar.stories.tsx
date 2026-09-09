import type { Meta, StoryObj } from "@storybook/react";
import { NavigationSidebar, BottomNav } from "./NavigationSidebar";

const meta: Meta<typeof NavigationSidebar> = {
  title: "Widgets/NavigationSidebar",
  component: NavigationSidebar,
  tags: ["autodocs"]
};

export default meta;

export const DesktopSidebar: StoryObj<typeof NavigationSidebar> = {
  args: {
    currentRoute: "/",
    currentUser: {
      name: "Bác Ba Nông Dân",
      handle: "bacba_dalat",
      avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80"
    },
    onNewPostClick: () => alert("Mở trình tạo bài viết mới!"),
    onNavigate: (route) => alert(`Chuyển đến: ${route}`)
  }
};

export const MobileBottomNavigation: StoryObj = {
  render: () => (
    <div className="relative h-28 w-full max-w-sm rounded-xl border border-border bg-background overflow-hidden">
      <BottomNav
        currentRoute="/"
        onNavigate={(r) => alert(`Navigate mobile: ${r}`)}
        onNewPostClick={() => alert("Mobile: Mở tạo bài viết")}
      />
    </div>
  )
};
