import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../providers/AuthContext';
import { PATHS } from '../routes/paths';
import type { UserRole } from '../../shared/types/auth';

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
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 font-sans">
      {/* Global Application Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/95">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link to={PATHS.PUBLIC.HOME} className="flex items-center gap-2 font-bold text-xl text-green-700 dark:text-green-500">
              🌱 <span>{t('common.appName')}</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link
                to={PATHS.PUBLIC.HOME}
                className={`transition-colors hover:text-green-600 ${
                  location.pathname === PATHS.PUBLIC.HOME ? 'text-green-600 font-semibold' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {t('nav.home')}
              </Link>
              <Link
                to={PATHS.PUBLIC.CROPS}
                className={`transition-colors hover:text-green-600 ${
                  location.pathname.startsWith(PATHS.PUBLIC.CROPS) ? 'text-green-600 font-semibold' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {t('nav.crops')}
              </Link>
              <Link
                to={PATHS.PUBLIC.FARMS}
                className={`transition-colors hover:text-green-600 ${
                  location.pathname.startsWith(PATHS.PUBLIC.FARMS) ? 'text-green-600 font-semibold' : 'text-gray-600 dark:text-gray-300'
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
              className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition"
              title="Chuyển đổi ngôn ngữ / Switch Language"
            >
              🌐 <span className="uppercase">{i18n.language.startsWith('vi') ? 'VI' : 'EN'}</span>
            </button>

            {/* Quick Role Simulator (Developer & Testing Tool) */}
            <div className="hidden sm:flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs">
              <span className="text-gray-500 font-medium">Role:</span>
              <select
                value={role ?? 'GUEST'}
                onChange={handleRoleChange}
                className="bg-transparent font-semibold text-green-700 dark:text-green-400 focus:outline-none cursor-pointer"
              >
                <option value="GUEST">{t('roles.guest')}</option>
                <option value="CUSTOMER">{t('roles.customer')}</option>
                <option value="STAFF">{t('roles.staff')}</option>
                <option value="ADMIN">{t('roles.admin')}</option>
              </select>
            </div>

            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-1 rounded bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                  {user.role}
                </span>
                <button
                  onClick={logout}
                  className="text-xs font-medium px-2.5 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition"
                >
                  {t('common.actions.logout')}
                </button>
              </div>
            ) : (
              <Link
                to={PATHS.AUTH.LOGIN}
                className="inline-flex items-center justify-center rounded-lg bg-green-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-green-500 transition"
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
      <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 py-4 text-center text-xs text-gray-500">
        {t('common.appName')} &copy; 2026. Enterprise Scalable Architecture.
      </footer>
    </div>
  );
};
