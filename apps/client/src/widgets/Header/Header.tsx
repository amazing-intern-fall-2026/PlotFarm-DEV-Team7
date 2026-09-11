import React, { useState } from 'react';
import { Bell, Menu, X, ArrowLeft } from 'lucide-react';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/lib/utils';
import type { HeaderProps } from './types';
import { DEFAULT_HEADER_LABELS, DEFAULT_NAV_BY_ROLE, DEFAULT_CUSTOMER_AUTH_NAV } from './constants';
import { HeaderBranding } from './HeaderBranding';
import { HeaderNav } from './HeaderNav';
import { HeaderUserMenu } from './HeaderUserMenu';

export const Header: React.FC<HeaderProps> = ({
  variant = 'customer',
  user,
  navigation,
  title,
  subtitle,
  notificationCount = 0,
  searchSlot,
  actionsSlot,
  labels,
  showBack = false,
  onBack,
  onNotificationClick,
  onLogout,
  onLoginClick,
  onRegisterClick,
  onProfileClick,
  onNavItemClick,
  className,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = { ...DEFAULT_HEADER_LABELS, ...labels };

  const navItems =
    navigation ??
    (variant === 'customer'
      ? user
        ? DEFAULT_CUSTOMER_AUTH_NAV
        : DEFAULT_NAV_BY_ROLE.customer
      : DEFAULT_NAV_BY_ROLE[variant]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur-md text-foreground transition-colors',
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Back button, Branding, Subtitle, Navigation */}
        <div className="flex items-center gap-4 lg:gap-8">
          {showBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-foreground"
              aria-label={t.backAria}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}

          <HeaderBranding variant={variant} title={title} />

          {subtitle && (
            <div className="hidden xl:flex items-center text-xs text-muted-foreground border-l border-border pl-4">
              {subtitle}
            </div>
          )}

          <HeaderNav items={navItems} onNavItemClick={onNavItemClick} />
        </div>

        {/* Right: Search, Actions, Notifications, User/Auth, Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {searchSlot && <div className="hidden md:flex items-center">{searchSlot}</div>}
          {actionsSlot && <div className="flex items-center">{actionsSlot}</div>}

          {variant === 'farmer' && user?.statusText && (
            <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              {user.statusText}
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={onNotificationClick}
            className="relative text-muted-foreground hover:text-foreground"
            aria-label={t.notificationAria}
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground shadow-xs animate-in zoom-in">
                {notificationCount > 99 ? '99+' : notificationCount}
              </span>
            )}
          </Button>

          {user ? (
            <HeaderUserMenu
              user={user}
              labels={labels}
              onProfileClick={onProfileClick}
              onLogout={onLogout}
            />
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onLoginClick}
                className="h-8 px-3 text-xs font-semibold text-foreground border-border hover:bg-muted"
              >
                {t.login}
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={onRegisterClick}
                className="h-8 px-3 text-xs font-semibold shadow-xs"
              >
                {t.register}
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-foreground"
            aria-label={t.menuAria}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border px-4 py-4 space-y-3 bg-card text-foreground animate-in slide-in-from-top-2">
          {searchSlot && <div className="pb-2">{searchSlot}</div>}
          <HeaderNav
            items={navItems}
            isMobile
            onNavItemClick={(item) => {
              setIsMobileMenuOpen(false);
              onNavItemClick?.(item);
            }}
          />
        </div>
      )}
    </header>
  );
};
