import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/entities/session';
import { PATHS } from '@/shared/config/paths';
import type { UserRole } from '@/shared/types/auth';

import { Logo } from '@/shared/ui';

export const MainLayout: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, role, isAuthenticated, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as UserRole | 'GUEST';
    if (newRole === 'GUEST') {
      logout();
      navigate(PATHS.PUBLIC.HOME);
    } else {
      switchRole(newRole);
      if (newRole === 'CUSTOMER') navigate(PATHS.CUSTOMER.DASHBOARD);
      if (newRole === 'STAFF') navigate(PATHS.STAFF.DASHBOARD);
      if (newRole === 'ADMIN') navigate(PATHS.ADMIN.DASHBOARD);
    }
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith('vi') ? 'en' : 'vi';
    i18n.changeLanguage(nextLang);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans antialiased">
      {/* Global Application Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link to={PATHS.PUBLIC.HOME} className="flex items-center">
              <Logo size="sm" showText />
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link
                to={PATHS.PUBLIC.HOME}
                className={`transition-colors hover:text-primary ${
                  location.pathname === PATHS.PUBLIC.HOME ? 'text-primary font-semibold' : 'text-muted-foreground'
                }`}
              >
                {t('nav.home')}
              </Link>
              <Link
                to={PATHS.PUBLIC.CROPS}
                className={`transition-colors hover:text-primary ${
                  location.pathname.startsWith(PATHS.PUBLIC.CROPS) ? 'text-primary font-semibold' : 'text-muted-foreground'
                }`}
              >
                {t('nav.crops')}
              </Link>
              <Link
                to={PATHS.PUBLIC.FARMS}
                className={`transition-colors hover:text-primary ${
                  location.pathname.startsWith(PATHS.PUBLIC.FARMS) ? 'text-primary font-semibold' : 'text-muted-foreground'
                }`}
              >
                {t('nav.farms')}
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 rounded-lg border border-border bg-muted/50 px-2.5 py-1.5 text-xs font-semibold hover:bg-muted transition"
              title="Chuyển đổi ngôn ngữ / Switch Language"
            >
              🌐 <span className="uppercase">{i18n.language.startsWith('vi') ? 'VI' : 'EN'}</span>
            </button>

            {/* Quick Role Simulator (Developer & Testing Tool) */}
            <div className="hidden sm:flex items-center gap-1.5 bg-muted/60 px-2.5 py-1.5 rounded-lg border border-border text-xs">
              <span className="text-muted-foreground font-medium">Role:</span>
              <select
                value={role ?? 'GUEST'}
                onChange={handleRoleChange}
                className="bg-transparent font-semibold text-primary focus:outline-none cursor-pointer"
              >
                <option value="GUEST">{t('roles.guest')}</option>
                <option value="CUSTOMER">{t('roles.customer')}</option>
                <option value="STAFF">{t('roles.staff')}</option>
                <option value="ADMIN">{t('roles.admin')}</option>
              </select>
            </div>

            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-1 rounded-md bg-primary/10 text-primary">
                  {user.role}
                </span>
                <button
                  onClick={logout}
                  className="text-xs font-medium px-2.5 py-1.5 rounded-md border border-border hover:bg-muted transition"
                >
                  {t('common.actions.logout')}
                </button>
              </div>
            ) : (
              <Link
                to={PATHS.AUTH.LOGIN}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition"
              >
                {t('common.actions.login')}
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Global Footer */}
      <footer className="border-t border-border bg-card py-4 text-center text-xs text-muted-foreground">
        {t('common.appName')} &copy; 2026. Nền tảng Nông trại Thực nghiệm Công nghệ cao.
      </footer>
    </div>
  );
};
