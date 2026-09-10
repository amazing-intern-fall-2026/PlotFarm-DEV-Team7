import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PORTAL_NAVIGATION } from '../config/navigation';
import type { UserRole } from '../../shared/types/auth';

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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Scalable Dynamic Sidebar */}
        <aside className="w-full lg:w-60 flex-shrink-0">
          <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-900 sticky top-24">
            <div className="mb-3 px-2 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wider text-center" />
            <div className={`mb-3 px-2 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wider text-center ${config.badgeClass}`}>
              {t(config.titleKey)}
            </div>

            <nav className="space-y-1">
              {config.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400 font-semibold'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'
                    }`
                  }
                >
                  <span className="text-base">{item.icon}</span>
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
