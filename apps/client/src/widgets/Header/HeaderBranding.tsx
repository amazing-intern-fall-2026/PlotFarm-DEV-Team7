import React from 'react';
import { Logo, Badge } from '@/shared/ui';

interface HeaderBrandingProps {
  variant: 'customer' | 'farmer' | 'admin';
  title?: string;
}

export const HeaderBranding: React.FC<HeaderBrandingProps> = ({ variant, title }) => {
  if (variant === 'customer') {
    return (
      <a href="/" className="flex items-center gap-2.5 focus:outline-none">
        <Logo size="sm" showText />
      </a>
    );
  }

  if (variant === 'farmer') {
    return (
      <a href="/staff/dashboard" className="flex items-center gap-2.5 focus:outline-none">
        <Logo size="sm" showText={false} />
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary">
              Cloud Farm Ops
            </span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          </div>
          <span className="text-sm font-bold leading-tight text-foreground">
            {title || 'Field Operations'}
          </span>
        </div>
      </a>
    );
  }

  return (
    <a href="/admin/dashboard" className="flex items-center gap-2.5 focus:outline-none">
      <Logo size="sm" showText={false} />
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-600">
            PlotFarm Admin
          </span>
          <Badge variant="destructive" className="text-[9px] px-1 py-0 h-4">
            PROD
          </Badge>
        </div>
        <span className="text-sm font-bold leading-tight text-foreground">
          {title || 'Hệ Thống Quản Trị'}
        </span>
      </div>
    </a>
  );
};
