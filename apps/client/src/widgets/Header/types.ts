import React from 'react';

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

export interface HeaderLabels {
  login?: string;
  register?: string;
  logout?: string;
  profile?: string;
  settings?: string;
  notificationAria?: string;
  menuAria?: string;
  backAria?: string;
  adminRole?: string;
  staffRole?: string;
  customerRole?: string;
}

export interface HeaderProps {
  /**
   * Vai trò áp dụng giao diện chuyên biệt
   */
  variant?: 'customer' | 'farmer' | 'admin';

  /**
   * Thông tin người dùng hiện tại (null nếu là khách vãng lai)
   */
  user?: HeaderUser | null;

  /**
   * Danh sách điều hướng tùy chỉnh
   */
  navigation?: HeaderNavItem[];

  /**
   * Tiêu đề / Breadcrumb tùy chỉnh cho phân hệ
   */
  title?: string;
  subtitle?: string;

  /**
   * Số lượng thông báo chưa đọc
   */
  notificationCount?: number;

  /**
   * Slot tìm kiếm tùy biến
   */
  searchSlot?: React.ReactNode;

  /**
   * Slot nút hành động nhanh tùy biến
   */
  actionsSlot?: React.ReactNode;

  /**
   * Nhãn văn bản tùy chỉnh (hỗ trợ đa ngôn ngữ, không fix cứng chuỗi)
   */
  labels?: HeaderLabels;

  /**
   * Hiển thị nút quay lại (Back button)
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
