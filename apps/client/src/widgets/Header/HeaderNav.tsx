import React from 'react';
import { cn } from '@/shared/lib/utils';
import type { HeaderNavItem } from './types';

interface HeaderNavProps {
  items: HeaderNavItem[];
  onNavItemClick?: (item: HeaderNavItem) => void;
  isMobile?: boolean;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  items,
  onNavItemClick,
  isMobile = false,
}) => {
  if (isMobile) {
    return (
      <nav className="flex flex-col space-y-1">
        {items.map((item) => (
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
              'px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between transition-colors',
              item.isActive
                ? 'bg-primary text-primary-foreground font-bold'
                : 'hover:bg-muted text-foreground'
            )}
          >
            <span>{item.label}</span>
            {item.badge && (
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-muted text-foreground">
                {item.badge}
              </span>
            )}
          </a>
        ))}
      </nav>
    );
  }

  return (
    <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
      {items.map((item) => (
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
  );
};
