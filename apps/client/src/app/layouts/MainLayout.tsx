import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/entities/session';
import { PATHS } from '@/shared/config/paths';
import { Header, Footer, type HeaderUser, type HeaderNavItem } from '@/widgets';

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

  const customerNav: HeaderNavItem[] = user?.role === 'CUSTOMER'
    ? [
        { label: t('nav.home'), href: PATHS.PUBLIC.HOME, isActive: location.pathname === PATHS.PUBLIC.HOME },
        { label: t('nav.explorePlots'), href: PATHS.PUBLIC.PLOTS, isActive: location.pathname.startsWith(PATHS.PUBLIC.PLOTS) },
        { label: t('nav.myGarden'), href: PATHS.CUSTOMER.MY_PLOTS, isActive: location.pathname.startsWith(PATHS.CUSTOMER.MY_PLOTS) },
        { label: t('nav.aboutUs', { defaultValue: 'Về chúng tôi' }), href: PATHS.PUBLIC.ABOUT, isActive: location.pathname.startsWith(PATHS.PUBLIC.ABOUT) }
      ]
    : [
        { label: t('nav.home'), href: PATHS.PUBLIC.HOME, isActive: location.pathname === PATHS.PUBLIC.HOME },
        { label: t('nav.plots'), href: PATHS.PUBLIC.PLOTS, isActive: location.pathname.startsWith(PATHS.PUBLIC.PLOTS) },
        { label: t('nav.crops'), href: PATHS.PUBLIC.CROPS, isActive: location.pathname.startsWith(PATHS.PUBLIC.CROPS) },
        { label: t('nav.farms'), href: PATHS.PUBLIC.FARMS, isActive: location.pathname.startsWith(PATHS.PUBLIC.FARMS) },
        { label: t('nav.about'), href: PATHS.PUBLIC.ABOUT, isActive: location.pathname.startsWith(PATHS.PUBLIC.ABOUT) }
      ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans antialiased">
      {/* Reusable Global Header (Matches Storybook exactly) */}
      <Header
        variant={variant}
        user={headerUser}
        navigation={variant === 'customer' ? customerNav : undefined}
        onLoginClick={() => navigate(PATHS.AUTH.LOGIN)}
        onRegisterClick={() => navigate(PATHS.AUTH.REGISTER)}
        onLogout={logout}
        onNavItemClick={(item) => navigate(item.href)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Reusable Global Footer */}
      <Footer />
    </div>
  );
};
