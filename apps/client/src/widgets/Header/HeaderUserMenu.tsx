import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, LogOut, User, Settings } from 'lucide-react';
import { Avatar, Badge, Button } from '@/shared/ui';
import { cn } from '@/shared/lib/utils';
import type { HeaderUser, HeaderLabels } from './types';
import { DEFAULT_HEADER_LABELS, ROLE_BADGE_CONFIG } from './constants';

interface HeaderUserMenuProps {
  user: HeaderUser;
  labels?: HeaderLabels;
  onProfileClick?: () => void;
  onLogout?: () => void;
}

export const HeaderUserMenu: React.FC<HeaderUserMenuProps> = ({
  user,
  labels,
  onProfileClick,
  onLogout,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const t = { ...DEFAULT_HEADER_LABELS, ...labels };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const badgeConfig = user.role ? ROLE_BADGE_CONFIG[user.role] : null;
  const roleLabel = badgeConfig ? t[badgeConfig.labelKey] : t.customerRole;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-muted/80 transition-all focus:outline-none"
        aria-expanded={isOpen}
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
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-card p-2 text-foreground shadow-xl ring-1 ring-black/5 animate-in fade-in-80 zoom-in-95 z-50">
          <div className="px-3 py-2 border-b border-border mb-1">
            <p className="text-xs font-bold truncate text-foreground">{user.fullName}</p>
            <div className="mt-1 flex items-center gap-1.5">
              <Badge
                variant={badgeConfig?.variant || 'success'}
                className="text-[10px] font-semibold px-2 py-0.5"
              >
                {roleLabel}
              </Badge>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsOpen(false);
              onProfileClick?.();
            }}
            leftIcon={<User className="h-4 w-4 text-muted-foreground" />}
            className="w-full justify-start text-xs font-medium text-foreground hover:bg-muted h-9 px-3"
          >
            {t.profile}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsOpen(false);
              onProfileClick?.();
            }}
            leftIcon={<Settings className="h-4 w-4 text-muted-foreground" />}
            className="w-full justify-start text-xs font-medium text-foreground hover:bg-muted h-9 px-3"
          >
            {t.settings}
          </Button>

          <div className="my-1 border-t border-border" />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsOpen(false);
              onLogout?.();
            }}
            leftIcon={<LogOut className="h-4 w-4 text-destructive" />}
            className="w-full justify-start text-xs font-medium text-destructive hover:bg-destructive/10 hover:text-destructive h-9 px-3"
          >
            {t.logout}
          </Button>
        </div>
      )}
    </div>
  );
};
