import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../app/providers/AuthContext';
import { PATHS } from '../../app/routes/paths';
import type { UserRole } from '../../shared/types/auth';

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
    <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t('common.actions.login')}</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
              {t('roles.customer')} / {t('roles.staff')} / {t('roles.admin')}
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
            >
              <option value="CUSTOMER">{t('roles.customer')}</option>
              <option value="STAFF">{t('roles.staff')}</option>
              <option value="ADMIN">{t('roles.admin')}</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-green-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 transition"
          >
            {t('common.actions.login')}
          </button>
        </form>
      </div>
    </div>
  );
};
