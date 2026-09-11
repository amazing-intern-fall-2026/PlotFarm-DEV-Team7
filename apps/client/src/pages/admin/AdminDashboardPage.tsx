import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/entities/session';

export const AdminDashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          {t('portals.admin')}: {user?.fullName}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {t('nav.dashboard')}
        </p>
      </div>
    </div>
  );
};
