import * as React from "react";
import {
  Home,
  Compass,
  Bell,
  MessageSquare,
  Sprout,
  User,
  PlusCircle,
  LogOut
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Avatar, NotificationBadge, Button } from "@/shared/ui";

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  href: string;
  badgeCount?: number;
}

export interface NavigationSidebarProps {
  currentRoute?: string;
  onNavigate?: (route: string) => void;
  onNewPostClick?: () => void;
  currentUser?: {
    name: string;
    handle: string;
    avatarUrl?: string;
  };
  className?: string;
}

export function NavigationSidebar({
  currentRoute = "/",
  onNavigate,
  onNewPostClick,
  currentUser = {
    name: "Nguyễn Văn Nông",
    handle: "farmer_nguyen",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
  },
  className
}: NavigationSidebarProps) {
  const navItems: NavItem[] = [
    { id: "/", label: "Trang chủ", icon: <Home className="h-5 w-5" />, href: "/" },
    { id: "/explore", label: "Khám phá", icon: <Compass className="h-5 w-5" />, href: "/explore" },
    {
      id: "/notifications",
      label: "Thông báo",
      icon: <Bell className="h-5 w-5" />,
      href: "/notifications",
      badgeCount: 3
    },
    {
      id: "/messages",
      label: "Tin nhắn",
      icon: <MessageSquare className="h-5 w-5" />,
      href: "/messages",
      badgeCount: 5
    },
    { id: "/plots", label: "Đất của tôi", icon: <Sprout className="h-5 w-5" />, href: "/plots" },
    { id: "/profile", label: "Trang cá nhân", icon: <User className="h-5 w-5" />, href: "/profile" }
  ];

  return (
    <aside
      className={cn(
        "flex h-screen w-64 flex-col justify-between border-r border-border bg-card p-4 shadow-xs",
        className
      )}
    >
      <div className="space-y-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 px-3 py-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Sprout className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">
              PlotFarm
            </h1>
            <p className="text-[10px] font-medium text-emerald-700 -mt-1">
              Social Farming Platform
            </p>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate && onNavigate(item.id)}
                className={cn(
                  "relative flex w-full items-center gap-3.5 rounded-xl px-3.5 py-3 text-sm font-semibold transition-colors cursor-pointer",
                  isActive
                    ? "bg-emerald-50 text-primary"
                    : "text-neutral-700 hover:bg-muted hover:text-foreground"
                )}
              >
                <div className="relative">
                  {item.icon}
                  {item.badgeCount !== undefined && item.badgeCount > 0 && (
                    <NotificationBadge
                      count={item.badgeCount}
                      className="absolute -top-1.5 -right-2"
                    />
                  )}
                </div>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="pt-2">
          <Button
            size="lg"
            className="w-full shadow-md"
            leftIcon={<PlusCircle className="h-5 w-5" />}
            onClick={onNewPostClick}
          >
            Đăng bài mới
          </Button>
        </div>
      </div>

      {/* User Card */}
      <div className="flex items-center justify-between rounded-xl border border-border/80 bg-muted/40 p-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <Avatar
            src={currentUser.avatarUrl}
            name={currentUser.name}
            size="md"
            status="online"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-foreground">
              {currentUser.name}
            </p>
            <p className="truncate text-[11px] text-muted-foreground">
              @{currentUser.handle}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-destructive transition-colors cursor-pointer"
          title="Đăng xuất"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}

export function BottomNav({
  currentRoute = "/",
  onNavigate,
  onNewPostClick
}: {
  currentRoute?: string;
  onNavigate?: (route: string) => void;
  onNewPostClick?: () => void;
}) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-border bg-card/95 backdrop-blur-md px-2 md:hidden">
      <button
        type="button"
        onClick={() => onNavigate && onNavigate("/")}
        className={cn(
          "flex flex-col items-center gap-1 text-[10px] font-medium transition-colors",
          currentRoute === "/" ? "text-primary font-bold" : "text-muted-foreground"
        )}
      >
        <Home className="h-5 w-5" />
        <span>Trang chủ</span>
      </button>

      <button
        type="button"
        onClick={() => onNavigate && onNavigate("/explore")}
        className={cn(
          "flex flex-col items-center gap-1 text-[10px] font-medium transition-colors",
          currentRoute === "/explore" ? "text-primary font-bold" : "text-muted-foreground"
        )}
      >
        <Compass className="h-5 w-5" />
        <span>Khám phá</span>
      </button>

      {/* Floating Create Post Button */}
      <button
        type="button"
        onClick={onNewPostClick}
        className="-mt-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg active:scale-95 transition-transform"
        aria-label="Tạo bài viết"
      >
        <PlusCircle className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={() => onNavigate && onNavigate("/notifications")}
        className={cn(
          "relative flex flex-col items-center gap-1 text-[10px] font-medium transition-colors",
          currentRoute === "/notifications" ? "text-primary font-bold" : "text-muted-foreground"
        )}
      >
        <Bell className="h-5 w-5" />
        <NotificationBadge dot className="absolute top-0 right-3" />
        <span>Thông báo</span>
      </button>

      <button
        type="button"
        onClick={() => onNavigate && onNavigate("/profile")}
        className={cn(
          "flex flex-col items-center gap-1 text-[10px] font-medium transition-colors",
          currentRoute === "/profile" ? "text-primary font-bold" : "text-muted-foreground"
        )}
      >
        <User className="h-5 w-5" />
        <span>Cá nhân</span>
      </button>
    </nav>
  );
}
