import * as React from "react";
import { cn } from "@/shared/lib/utils";

export interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
  badge?: string | number;
  id?: string;
}

/**
 * SidebarItem — một mục menu trong Sidebar (Desktop).
 * Hỗ trợ hai trạng thái: expanded (icon + label) và collapsed (chỉ icon).
 */
export function SidebarItem({
  icon,
  label,
  isActive = false,
  collapsed = false,
  onClick,
  badge,
  id
}: SidebarItemProps) {
  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      title={collapsed ? label : undefined}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5",
        "text-sm font-medium transition-all duration-150 focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-primary/60",
        isActive
          ? "bg-primary text-white shadow-sm shadow-primary/30"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        collapsed ? "justify-center px-2" : "justify-start"
      )}
    >
      {/* Icon */}
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center transition-transform duration-150",
          isActive && !collapsed && "scale-105"
        )}
      >
        {icon}
      </span>

      {/* Label — ẩn khi collapsed */}
      {!collapsed && (
        <span className="flex-1 truncate text-left leading-tight">{label}</span>
      )}

      {/* Badge */}
      {badge !== undefined && !collapsed && (
        <span
          className={cn(
            "ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5",
            "text-[10px] font-semibold leading-none",
            isActive
              ? "bg-white/20 text-white"
              : "bg-primary/10 text-primary"
          )}
        >
          {badge}
        </span>
      )}

      {/* Badge khi collapsed — dấu chấm nhỏ */}
      {badge !== undefined && collapsed && (
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
      )}
    </button>
  );
}

SidebarItem.displayName = "SidebarItem";
