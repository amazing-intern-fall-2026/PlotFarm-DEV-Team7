import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PORTAL_NAVIGATION } from '../config/navigation';
import type { UserRole } from '@/shared/types/auth';

interface DashboardLayoutProps {
  portalRole: UserRole;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ portalRole }) => {
  const { t } = useTranslation();
  const config = PORTAL_NAVIGATION[portalRole];

  if (!config) {
    return <Outlet />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 font-sans">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Scalable Dynamic Sidebar */}
        <aside className="w-full lg:w-60 flex-shrink-0">
          <div className="rounded-xl border border-border bg-card p-3 shadow-xs sticky top-24">
            <div className={`mb-3 px-2 py-1.5 rounded-lg border border-border text-xs font-bold uppercase tracking-wider text-center ${config.badgeClass}`}>
              {t(config.titleKey)}
            </div>

            <nav className="space-y-1">
              {config.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary font-bold shadow-xs'
                        : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'
                    }`
                  }
                >
                  <span>{t(item.labelKey)}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        {/* Child Portal Page Viewport */}
        <section className="flex-1 min-w-0">
          <Outlet />
        </section>
      </div>
    </div>
  );
};
