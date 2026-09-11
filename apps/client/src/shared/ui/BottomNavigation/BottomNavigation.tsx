import { BottomNavItem, type BottomNavItemProps } from "./BottomNavItem";
import { cn } from "@/shared/lib/utils";


export interface BottomNavigationProps {
  /** Danh sách các tab hiển thị */
  items: BottomNavItemProps[];
  /** Index của tab đang active */
  activeIndex?: number;
  /** Callback khi chọn tab (trả về index) */
  onTabChange?: (index: number) => void;
  className?: string;
}

/**
 * BottomNavigation — thanh điều hướng đáy màn hình cố định cho mobile.
 *
 * Hiển thị khi viewport < 1024px (lg).
 * Đặt `pb-20` (hoặc `pb-[64px]`) lên `<main>` để nội dung không bị che.
 *
 * @example
 * <BottomNavigation
 *   items={customerTabs}
 *   activeIndex={0}
 *   onTabChange={(i) => navigate(tabs[i].path)}
 * />
 */
export function BottomNavigation({
  items,
  activeIndex = 0,
  onTabChange,
  className
}: BottomNavigationProps) {
  return (
    <nav
      aria-label="Điều hướng chính"
      className={cn(
        // Fixed bottom, full width, z-50
        "fixed bottom-0 left-0 right-0 z-50",
        // Height & layout
        "flex h-[60px] items-stretch",
        // Bg + blur + border top
        "bg-white/95 backdrop-blur-sm border-t border-border",
        // Safe area for notch devices
        "pb-safe",
        className
      )}
    >
      {items.map((item, index) => (
        <BottomNavItem
          key={item.id ?? index}
          id={item.id ?? `bottom-nav-item-${index}`}
          icon={item.icon}
          label={item.label}
          isActive={index === activeIndex}
          onClick={() => {
            item.onClick?.();
            onTabChange?.(index);
          }}
        />
      ))}
    </nav>
  );
}

BottomNavigation.displayName = "BottomNavigation";
