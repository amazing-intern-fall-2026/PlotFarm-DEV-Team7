import * as React from "react";
import { Sprout, Bell, Plus, Menu } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Avatar, NotificationBadge, Button, SearchBar } from "@/shared/ui";

export interface HeaderTopBarProps extends React.HTMLAttributes<HTMLElement> {
  currentUser?: {
    name: string;
    avatarUrl?: string;
  };
  notificationCount?: number;
  onNewPostClick?: () => void;
  onNotificationsClick?: () => void;
  onMenuToggle?: () => void;
}

export function HeaderTopBar({
  currentUser = {
    name: "Nguyễn Văn Nông",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
  },
  notificationCount = 4,
  onNewPostClick,
  onNotificationsClick,
  onMenuToggle,
  className,
  ...props
}: HeaderTopBarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border bg-card/95 px-4 backdrop-blur-md shadow-xs md:px-6",
        className
      )}
      {...props}
    >
      {/* Brand & Mobile Hamburger */}
      <div className="flex items-center gap-3">
        {onMenuToggle && (
          <button
            type="button"
            onClick={onMenuToggle}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted md:hidden"
            aria-label="Mở menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        <div className="flex items-center gap-2 cursor-pointer">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Sprout className="h-5 w-5" />
          </div>
          <span className="hidden font-bold tracking-tight text-foreground text-lg sm:inline-block">
            PlotFarm
          </span>
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="mx-4 max-w-md flex-1">
        <SearchBar />
      </div>

      {/* Right Action Items */}
      <div className="flex items-center gap-3 shrink-0">
        <Button
          size="sm"
          className="hidden sm:inline-flex"
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={onNewPostClick}
        >
          Đăng bài
        </Button>

        {/* Notifications Icon Button */}
        <div className="relative">
          <button
            type="button"
            onClick={onNotificationsClick}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
            aria-label="Thông báo"
          >
            <Bell className="h-5 w-5" />
            <NotificationBadge
              count={notificationCount}
              className="absolute -top-1 -right-1"
            />
          </button>
        </div>

        {/* User Avatar */}
        <Avatar
          src={currentUser.avatarUrl}
          name={currentUser.name}
          size="md"
          status="online"
          className="cursor-pointer transition-transform hover:scale-105"
        />
      </div>
    </header>
  );
}
