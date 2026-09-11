import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/entities/session';
import { PATHS } from '@/shared/config/paths';
import { Header, type HeaderUser, type HeaderNavItem } from '@/widgets';

export const MainLayout: React.FC = () => {
  const { t } = useTranslation();
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const headerUser: HeaderUser | null = user
    ? {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
        status: 'online'
      }
    : null;

  const variant = role === 'ADMIN' ? 'admin' : role === 'STAFF' ? 'farmer' : 'customer';

  const customerNav: HeaderNavItem[] = [
    { label: t('nav.home'), href: PATHS.PUBLIC.HOME, isActive: location.pathname === PATHS.PUBLIC.HOME },
    { label: t('nav.crops'), href: PATHS.PUBLIC.CROPS, isActive: location.pathname.startsWith(PATHS.PUBLIC.CROPS) },
    { label: t('nav.farms'), href: PATHS.PUBLIC.FARMS, isActive: location.pathname.startsWith(PATHS.PUBLIC.FARMS) },
    ...(user?.role === 'CUSTOMER'
      ? [{ label: 'Mảnh vườn của tôi', href: PATHS.CUSTOMER.MY_PLOTS, isActive: location.pathname.startsWith(PATHS.CUSTOMER.MY_PLOTS) }]
      : [])
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans antialiased">
      {/* Reusable Global Header (No language toggle, no role switch on UI) */}
      <Header
        variant={variant}
        user={headerUser}
        navigation={customerNav}
        onLoginClick={() => navigate(PATHS.AUTH.LOGIN)}
        onRegisterClick={() => navigate(PATHS.AUTH.REGISTER)}
        onLogout={logout}
        onNavItemClick={(item) => navigate(item.href)}
      />

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
