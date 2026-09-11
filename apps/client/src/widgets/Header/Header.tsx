import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  Settings,
  ArrowLeft
} from 'lucide-react';
import { Logo, Avatar, Badge, Button } from '@/shared/ui';
import { cn } from '@/shared/lib/utils';

export interface HeaderNavItem {
  label: string;
  href: string;
  badge?: string | number;
  isActive?: boolean;
}

export interface HeaderUser {
  id?: string;
  fullName: string;
  email?: string;
  role?: 'CUSTOMER' | 'STAFF' | 'ADMIN' | string;
  avatarUrl?: string;
  status?: 'online' | 'busy' | 'offline';
  statusText?: string;
}

export interface HeaderProps {
  /**
   * Vai trò áp dụng giao diện chuyên biệt:
   * - 'customer': Cổng thông tin khách hàng & công cộng.
   * - 'farmer': Cổng vận hành nông trại thực địa (Field Ops).
   * - 'admin': Bảng điều khiển quản trị viên hệ thống.
   */
  variant?: 'customer' | 'farmer' | 'admin';

  /**
   * Thông tin người dùng hiện tại (null nếu là khách vãng lai).
   */
  user?: HeaderUser | null;

  /**
   * Danh sách điều hướng tùy chỉnh. Nếu không truyền sẽ lấy danh sách chuẩn theo từng vai trò.
   */
  navigation?: HeaderNavItem[];

  /**
   * Tiêu đề / Breadcrumb tùy chỉnh (thường dùng cho Admin hoặc Farmer).
   */
  title?: string;
  subtitle?: string;

  /**
   * Số lượng thông báo chưa đọc trên biểu tượng chuông.
   */
  notificationCount?: number;

  /**
   * Slot tìm kiếm tùy biến (ví dụ ô tìm thửa đất, khách hàng).
   */
  searchSlot?: React.ReactNode;

  /**
   * Slot nút hành động nhanh tùy biến (ví dụ Quét QR, Báo sự cố).
   */
  actionsSlot?: React.ReactNode;

  /**
   * Hiển thị nút quay lại (Back button) cho màn hình chi tiết hoặc mobile.
   */
  showBack?: boolean;
  onBack?: () => void;

  /**
   * Các sự kiện tương tác
   */
  onNotificationClick?: () => void;
  onLogout?: () => void;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  onProfileClick?: () => void;
  onNavItemClick?: (item: HeaderNavItem) => void;

  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  variant = 'customer',
  user,
  navigation,
  title,
  subtitle,
  notificationCount = 0,
  searchSlot,
  actionsSlot,
  showBack = false,
  onBack,
  onNotificationClick,
  onLogout,
  onLoginClick,
  onRegisterClick,
  onProfileClick,
  onNavItemClick,
  className
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Default navigation items by role
  const defaultCustomerNav: HeaderNavItem[] = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Gói thuê đất', href: '/plots' },
    { label: 'Cây trồng', href: '/crops' },
    { label: 'Nông trại mẫu', href: '/farms' },
    { label: 'Về PlotFarm', href: '/about' }
  ];

  const defaultFarmerNav: HeaderNavItem[] = [
    { label: 'Ô đất phụ trách', href: '/staff/assigned-plots', badge: '5 ô' },
    { label: 'Phiếu chăm sóc', href: '/staff/care-tasks', badge: 'Hôm nay' },
    { label: 'Nhật ký & Đo đạc', href: '/staff/telemetry' },
    { label: 'Lệnh thu hoạch', href: '/staff/harvests' }
  ];

  const defaultAdminNav: HeaderNavItem[] = [
    { label: 'Tổng quan', href: '/admin/dashboard' },
    { label: 'Quản lý thửa đất', href: '/admin/plots' },
    { label: 'Cây trồng & Mùa vụ', href: '/admin/crops' },
    { label: 'Nông trại', href: '/admin/farms' },
    { label: 'Hợp đồng & Đơn hàng', href: '/admin/compensations' },
    { label: 'Nhật ký kiểm toán', href: '/admin/audit-logs' }
  ];

  const navItems =
    navigation ??
    (variant === 'admin'
      ? defaultAdminNav
      : variant === 'farmer'
      ? defaultFarmerNav
      : defaultCustomerNav);

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case 'ADMIN':
        return (
          <Badge variant="destructive" className="text-[10px] font-semibold px-2 py-0.5">
            Quản trị viên
          </Badge>
        );
      case 'STAFF':
        return (
          <Badge variant="warning" className="text-[10px] font-semibold px-2 py-0.5">
            Kỹ thuật viên
          </Badge>
        );
      default:
        return (
          <Badge variant="success" className="text-[10px] font-semibold px-2 py-0.5">
            Khách hàng
          </Badge>
        );
    }
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur-md text-foreground transition-colors',
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Area: Branding & Title */}
        <div className="flex items-center gap-4 lg:gap-8">
          {showBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center justify-center p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
              aria-label="Quay lại"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}

          {/* Logo / Title Area */}
          <div className="flex items-center gap-3">
            {variant === 'customer' && (
              <a href="/" className="flex items-center gap-2.5 focus:outline-none">
                <Logo size="sm" showText />
              </a>
            )}

            {variant === 'farmer' && (
              <a href="/staff/dashboard" className="flex items-center gap-2.5 focus:outline-none">
                <Logo size="sm" showText={false} />
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                      Cloud Farm Ops
                    </span>
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  </div>
                  <span className="text-sm font-bold leading-tight text-foreground">
                    {title || 'Quản lý thực địa'}
                  </span>
                </div>
              </a>
            )}

            {variant === 'admin' && (
              <a href="/admin/dashboard" className="flex items-center gap-2.5 focus:outline-none">
                <Logo size="sm" showText={false} />
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700">
                      PlotFarm Admin
                    </span>
                    <Badge variant="warning" className="text-[9px] px-1.5 py-0 h-4 font-semibold">
                      PROD
                    </Badge>
                  </div>
                  <span className="text-sm font-bold leading-tight text-foreground">
                    {title || 'Hệ Thống Quản Trị'}
                  </span>
                </div>
              </a>
            )}
          </div>

          {/* Subtitle / Breadcrumb for Admin/Farmer desktop */}
          {subtitle && (
            <div className="hidden xl:flex items-center text-xs text-muted-foreground border-l border-border pl-4">
              {subtitle}
            </div>
          )}

          {/* Desktop Navigation (Customer role or broad role navigation) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  if (onNavItemClick) {
                    e.preventDefault();
                    onNavItemClick(item);
                  }
                }}
                className={cn(
                  'px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors inline-flex items-center gap-1.5 whitespace-nowrap',
                  item.isActive
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                )}
              >
                {item.label}
                {item.badge && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-primary/15 text-primary">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>
        </div>

        {/* Right Area: Search, Actions, Notifications, User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Custom Search Slot */}
          {searchSlot && <div className="hidden md:flex items-center">{searchSlot}</div>}

          {/* Actions Slot (e.g. Quét QR, Báo sự cố, Nút tạo đơn) */}
          {actionsSlot && <div className="flex items-center">{actionsSlot}</div>}

          {/* Farmer Status Chip */}
          {variant === 'farmer' && user?.statusText && (
            <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              {user.statusText}
            </div>
          )}

          {/* Notification Bell */}
          <button
            onClick={onNotificationClick}
            className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Thông báo"
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground shadow-xs animate-in zoom-in">
                {notificationCount > 99 ? '99+' : notificationCount}
              </span>
            )}
          </button>

          {/* User Profile / Auth State */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-muted/80 transition-all focus:outline-none"
                aria-expanded={isUserMenuOpen}
                aria-haspopup="true"
              >
                <Avatar
                  src={user.avatarUrl}
                  name={user.fullName}
                  size="sm"
                  status={user.status || 'online'}
                  className="ring-2 ring-primary/20"
                />
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-bold leading-tight max-w-[130px] truncate text-foreground">
                    {user.fullName}
                  </span>
                  <span className="text-[10px] leading-tight text-muted-foreground">
                    {user.email || user.role}
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-3.5 w-3.5 text-muted-foreground transition-transform',
                    isUserMenuOpen && 'rotate-180'
                  )}
                />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-card p-2 text-foreground shadow-xl ring-1 ring-black/5 animate-in fade-in-80 zoom-in-95 z-50">
                  <div className="px-3 py-2 border-b border-border mb-1">
                    <p className="text-xs font-bold truncate text-foreground">{user.fullName}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      {getRoleBadge(user.role)}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      onProfileClick?.();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-foreground hover:bg-muted transition-colors"
                  >
                    <User className="h-4 w-4 text-muted-foreground" />
                    Hồ sơ cá nhân
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      onProfileClick?.();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-foreground hover:bg-muted transition-colors"
                  >
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    Cài đặt tài khoản
                  </button>

                  <div className="my-1 border-t border-border" />

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      onLogout?.();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onLoginClick}
                className="h-8 px-3 text-xs font-semibold text-foreground border-border hover:bg-muted"
              >
                Đăng nhập
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={onRegisterClick}
                className="h-8 px-3 text-xs font-semibold shadow-xs"
              >
                Bắt đầu ngay
              </Button>
            </div>
          )}

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors focus:outline-none"
            aria-label="Mở danh mục điều hướng"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer / Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border px-4 py-4 space-y-3 bg-card text-foreground animate-in slide-in-from-top-2">
          {searchSlot && <div className="pb-2">{searchSlot}</div>}

          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  if (onNavItemClick) {
                    e.preventDefault();
                    onNavItemClick(item);
                  }
                }}
                className={cn(
                  'px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between transition-colors',
                  item.isActive
                    ? 'bg-primary text-primary-foreground font-bold'
                    : 'hover:bg-muted text-foreground'
                )}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {item.badge}
                  </Badge>
                )}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
