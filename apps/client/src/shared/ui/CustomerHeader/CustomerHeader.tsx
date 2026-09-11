import * as React from "react";
import { Bell, Menu, X } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { Avatar } from "@/shared/ui/Avatar";
import { Logo } from "@/shared/ui/Logo";
import { cn } from "@/shared/lib/utils";

export interface CustomerNavItem {
  id: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export interface CustomerHeaderUser {
  name: string;
  avatarSrc?: string;
}

export interface CustomerHeaderProps {
  navItems: CustomerNavItem[];
  user?: CustomerHeaderUser | null;
  /** Notification count */
  notificationCount?: number;
  /** i18n labels */
  notificationsLabel?: string;
  loginLabel?: string;
  menuLabel?: string;
  /** Callbacks */
  onNotificationsClick?: () => void;
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
  className?: string;
}

/**
 * CustomerHeader — header ngang đầy đủ cho vai trò Customer (Marketplace).
 *
 * Desktop (≥ lg): Logo | NavLinks | Hotline | Cart + Bell + User
 * Mobile (< lg) : Logo | Hamburger → slide-down Mobile Menu
 */
export function CustomerHeader({
  navItems,
  user,
  notificationCount = 0,
  notificationsLabel = "Thông báo",
  loginLabel = "Đăng nhập",
  menuLabel = "Menu",
  onNotificationsClick,
  onLoginClick,
  onLogoutClick,
  className
}: CustomerHeaderProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b border-border",
        className
      )}
    >
      {/* ── Main bar ──────────────────────────────────────────────────── */}
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Logo size="sm" showText className="shrink-0" />

        {/* ── Desktop nav links ──────────────────────────────────────── */}
        <nav
          aria-label="Điều hướng chính"
          className="hidden lg:flex items-center gap-1 ml-4"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`customer-nav-${item.id}`}
              type="button"
              onClick={item.onClick}
              aria-current={item.isActive ? "page" : undefined}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                item.isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* ── Spacer ────────────────────────────────────────────────────── */}
        <div className="flex-1" />



        {/* ── Actions ───────────────────────────────────────────────────── */}
        <div className="flex items-center gap-1">
          {/* Bell */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              aria-label={notificationsLabel}
              onClick={onNotificationsClick}
              className="h-9 w-9"
              id="customer-header-bell-btn"
            >
              <Bell className="h-5 w-5" />
            </Button>
            {notificationCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-destructive px-1 text-[9px] font-bold text-white">
                {notificationCount > 99 ? "99+" : notificationCount}
              </span>
            )}
          </div>

          {/* User or Login */}
          {user ? (
            <button
              type="button"
              aria-label={user.name}
              onClick={onLogoutClick}
              className="ml-1 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              id="customer-header-user-btn"
            >
              <Avatar name={user.name} src={user.avatarSrc} size="sm" />
            </button>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={onLoginClick}
              className="ml-1"
              id="customer-header-login-btn"
            >
              {loginLabel}
            </Button>
          )}

          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            aria-label={menuLabel}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden h-9 w-9 ml-1"
            id="customer-header-menu-btn"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* ── Mobile dropdown menu ────────────────────────────────────── */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-white px-4 pb-4 pt-2 shadow-md">
          <nav aria-label="Điều hướng di động" className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`customer-mobile-nav-${item.id}`}
                type="button"
                onClick={() => {
                  item.onClick?.();
                  setMobileOpen(false);
                }}
                aria-current={item.isActive ? "page" : undefined}
                className={cn(
                  "w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors",
                  item.isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

CustomerHeader.displayName = "CustomerHeader";
