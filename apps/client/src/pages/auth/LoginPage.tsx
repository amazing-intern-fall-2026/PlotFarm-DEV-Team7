import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/entities/session';
import { PATHS } from '@/shared/config/paths';
import type { UserRole } from '@/shared/types/auth';
import { Logo } from '@/shared/ui';

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect');

  const [role, setRole] = useState<UserRole>('CUSTOMER');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      id: `usr_${role.toLowerCase()}_01`,
      email: `${role.toLowerCase()}@plotfarm.vn`,
      fullName: t(`roles.${role.toLowerCase()}`),
      role,
    });

    if (redirectPath) {
      navigate(decodeURIComponent(redirectPath));
    } else {
      if (role === 'CUSTOMER') navigate(PATHS.CUSTOMER.DASHBOARD);
      if (role === 'STAFF') navigate(PATHS.STAFF.DASHBOARD);
      if (role === 'ADMIN') navigate(PATHS.ADMIN.DASHBOARD);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-8 font-sans">
      <div className="w-full max-w-sm space-y-5 rounded-2xl border border-border bg-card p-6 shadow-xs">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <h1 className="text-xl font-bold text-foreground">{t('common.actions.login')}</h1>
          <p className="text-sm text-muted-foreground">Đăng nhập vào hệ sinh thái PlotFarm</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1.5">
              Chọn vai trò ({t('roles.customer')} / {t('roles.staff')} / {t('roles.admin')})
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="block w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition"
            >
              <option value="CUSTOMER">{t('roles.customer')}</option>
              <option value="STAFF">{t('roles.staff')}</option>
              <option value="ADMIN">{t('roles.admin')}</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition"
          >
            {t('common.actions.login')}
          </button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          Chưa có tài khoản?{' '}
          <Link to={PATHS.AUTH.REGISTER} className="font-semibold text-primary hover:underline">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
};
