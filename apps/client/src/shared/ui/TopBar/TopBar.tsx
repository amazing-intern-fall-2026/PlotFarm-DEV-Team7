import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { Avatar } from "@/shared/ui/Avatar";
import { cn } from "@/shared/lib/utils";


export type AppRole = "customer" | "admin" | "farmer";

export interface TopBarUser {
  name: string;
  avatarSrc?: string;
  role: AppRole;
}

export interface TopBarBreadcrumbItem {
  label: string;
  onClick?: () => void;
  href?: string;
}

export type BreadcrumbItem = TopBarBreadcrumbItem;

export interface TopBarProps {
  user?: TopBarUser;
  /** Breadcrumb trail cho admin/farmer */
  breadcrumbs?: TopBarBreadcrumbItem[];
  /** Số thông báo chưa đọc */
  notificationCount?: number;
  /** i18n strings */
  searchPlaceholder?: string;
  notificationsLabel?: string;
  menuLabel?: string;
  roleBadgeLabel?: string;
  /** Callback mở Drawer khi ở Mobile (nút Menu) */
  onMenuClick?: () => void;
  /** Callback mở notification panel */
  onNotificationsClick?: () => void;
  className?: string;
}

const ROLE_COLORS: Record<AppRole, string> = {
  customer: "bg-blue-100 text-blue-700",
  admin: "bg-primary/10 text-primary",
  farmer: "bg-amber-100 text-amber-700"
};

/**
 * TopBar — thanh header tinh gọn dạng Dashboard bar cho Admin / Farmer (Desktop).
 * Mobile: hiện nút hamburger menu mở Drawer sidebar.
 */
export function TopBar({
  user,
  breadcrumbs: _breadcrumbs = [],
  notificationCount = 0,
  searchPlaceholder = "Tìm kiếm...",
  notificationsLabel = "Thông báo",
  menuLabel = "Menu",
  roleBadgeLabel,
  onMenuClick,
  onNotificationsClick,
  className
}: TopBarProps) {
  return (
    <header
      className={cn(
        "flex h-16 shrink-0 items-center gap-3 border-b border-border bg-white px-4 sm:px-6",
        className
      )}
    >
      {/* ── Mobile hamburger ──────────────────────────────────────────── */}
      <Button
        variant="ghost"
        size="icon"
        aria-label={menuLabel}
        onClick={onMenuClick}
        className="lg:hidden h-9 w-9 shrink-0"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* ── Search bar (đặt ngay bên trái thay thế vị trí breadcrumbs) ── */}
      <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/40 hover:bg-muted/60 focus-within:bg-background focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary/40 transition-all px-3 py-1.5 w-60 sm:w-80 md:w-96">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          type="search"
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          className={cn(
            "flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground",
            "focus:outline-none min-w-0"
          )}
        />
        <kbd className="hidden sm:inline-flex items-center rounded border border-border/80 bg-background px-1.5 py-0.5 text-[10px] font-mono font-medium text-muted-foreground shadow-2xs">
          Ctrl+K
        </kbd>
      </div>

      {/* ── Spacer đẩy toàn bộ cụm actions sang phải ───────────────────── */}
      <div className="flex-1" />

      {/* ── Notifications ───────────────────────────────────────────────── */}
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          aria-label={notificationsLabel}
          onClick={onNotificationsClick}
          className="h-9 w-9"
          id="topbar-notifications-btn"
        >
          <Bell className="h-5 w-5" />
        </Button>
        {notificationCount > 0 && (
          <span
            aria-label={`${notificationCount} thông báo chưa đọc`}
            className={cn(
              "absolute right-1 top-1 flex h-4 min-w-[16px] items-center justify-center",
              "rounded-full bg-destructive px-1 text-[9px] font-bold text-white"
            )}
          >
            {notificationCount > 99 ? "99+" : notificationCount}
          </span>
        )}
      </div>

      {/* ── User info ───────────────────────────────────────────────────── */}
      {user && (
        <div className="flex items-center gap-2.5 pl-1">
          <div className="hidden sm:flex flex-col items-end leading-none">
            <span className="text-sm font-semibold text-foreground truncate max-w-[120px]">
              {user.name}
            </span>
            {roleBadgeLabel && (
              <span
                className={cn(
                  "mt-0.5 rounded-full px-1.5 py-px text-[10px] font-medium",
                  ROLE_COLORS[user.role]
                )}
              >
                {roleBadgeLabel}
              </span>
            )}
          </div>
          <Avatar
            name={user.name}
            src={user.avatarSrc}
            size="sm"
            status="online"
          />
        </div>
      )}
    </header>
  );
}

TopBar.displayName = "TopBar";
