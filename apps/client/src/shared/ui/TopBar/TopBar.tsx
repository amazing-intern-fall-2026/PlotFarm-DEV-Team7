import * as React from "react";
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

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

export interface TopBarProps {
  user?: TopBarUser;
  /** Breadcrumb trail cho admin/farmer */
  breadcrumbs?: BreadcrumbItem[];
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
  breadcrumbs = [],
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
        "flex h-14 shrink-0 items-center gap-3 border-b border-border bg-white px-4",
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

      {/* ── Breadcrumb (desktop only) ─────────────────────────────────── */}
      {breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="hidden lg:flex items-center gap-1.5 text-sm">
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <span className="text-muted-foreground/50" aria-hidden="true">
                  /
                </span>
              )}
              {crumb.onClick ? (
                <button
                  type="button"
                  onClick={crumb.onClick}
                  className={cn(
                    "font-medium transition-colors hover:text-primary",
                    i === breadcrumbs.length - 1
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {crumb.label}
                </button>
              ) : (
                <span
                  className={cn(
                    "font-medium",
                    i === breadcrumbs.length - 1
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* ── Spacer ─────────────────────────────────────────────────────── */}
      <div className="flex-1" />

      {/* ── Search bar ──────────────────────────────────────────────────── */}
      <div className="hidden sm:flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-1.5 w-48 lg:w-64">
        <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <input
          type="search"
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          className={cn(
            "flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground",
            "focus:outline-none min-w-0"
          )}
        />
      </div>

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
