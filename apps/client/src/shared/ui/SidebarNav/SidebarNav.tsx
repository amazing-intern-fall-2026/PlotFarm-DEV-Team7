import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SidebarItem, type SidebarItemProps } from "./SidebarItem";
import { Logo } from "@/shared/ui/Logo";
import { cn } from "@/shared/lib/utils";

export type SidebarSection = {
  /** Tiêu đề nhóm menu (hiển thị khi expanded) */
  title?: string;
  items: SidebarItemProps[];
};

export interface SidebarNavProps {
  /** Danh sách nhóm menu */
  sections: SidebarSection[];
  /** Index item đang active (global flat index) */
  activeItemId?: string;
  /** Label collapse/expand cho a11y (từ i18n) */
  collapseLabel?: string;
  expandLabel?: string;
  /** Footer slot — ví dụ: thông tin user, logout */
  footer?: React.ReactNode;
  className?: string;
}

const SIDEBAR_WIDTH_EXPANDED = "w-60";
const SIDEBAR_WIDTH_COLLAPSED = "w-[68px]";

/**
 * SidebarNav — sidebar cố định bên trái cho Admin / Farmer trên Desktop.
 * - Expanded: 240px, hiển thị Logo + text + sections.
 * - Collapsed: 68px, chỉ hiển thị icon.
 * - Toggle bằng nút ChevronLeft / ChevronRight ở đáy.
 */
export function SidebarNav({
  sections,
  activeItemId,
  collapseLabel = "Thu gọn",
  expandLabel = "Mở rộng",
  footer,
  className
}: SidebarNavProps) {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <aside
      aria-label="Điều hướng hệ thống"
      className={cn(
        "hidden lg:flex flex-col h-screen sticky top-0",
        "bg-white border-r border-border",
        "transition-all duration-200 ease-in-out overflow-hidden shrink-0",
        collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED,
        className
      )}
    >
      {/* ── Logo header ────────────────────────────────────────────── */}
      <div
        className={cn(
          "flex h-16 items-center border-b border-border shrink-0",
          collapsed ? "justify-center px-0" : "gap-2 px-4"
        )}
      >
        <Logo size="sm" showText={!collapsed} />
      </div>

      {/* ── Scrollable menu area ─────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 space-y-4">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            {/* Section title */}
            {section.title && !collapsed && (
              <p
                className={cn(
                  "px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider",
                  "text-muted-foreground/70 truncate"
                )}
              >
                {section.title}
              </p>
            )}
            {section.items.map((item) => (
              <SidebarItem
                key={item.id}
                {...item}
                collapsed={collapsed}
                isActive={item.id === activeItemId}
              />
            ))}
          </div>
        ))}
      </div>

      {/* ── Footer slot ──────────────────────────────────────────────── */}
      {footer && (
        <div className={cn("border-t border-border px-2 py-3 shrink-0")}>
          {footer}
        </div>
      )}

      {/* ── Collapse toggle ──────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? expandLabel : collapseLabel}
        className={cn(
          "flex items-center justify-center border-t border-border py-3 shrink-0",
          "text-muted-foreground hover:text-foreground hover:bg-accent",
          "transition-colors duration-150 focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-inset"
        )}
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <>
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span className="text-xs font-medium">{collapseLabel}</span>
          </>
        )}
      </button>
    </aside>
  );
}

SidebarNav.displayName = "SidebarNav";
