import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PATHS } from '@/shared/config/paths';

export const UnauthorizedPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const fromPath = (location.state as { from?: string })?.from || '';

  return (
    <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-8">
      <div className="max-w-md w-full text-center space-y-4 rounded-xl border border-amber-200 bg-amber-50/40 p-6 shadow-sm dark:border-amber-900/50 dark:bg-gray-900">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          {t('errors.unauthorizedTitle')}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {t('errors.unauthorizedDesc')}
        </p>
        {fromPath && (
          <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono text-gray-600 dark:text-gray-400">
            {fromPath}
          </code>
        )}
        <div className="pt-2">
          <Link
            to={PATHS.PUBLIC.HOME}
            className="inline-block rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 transition"
          >
            {t('common.actions.backHome')}
          </Link>
        </div>
      </div>
    </div>
  );
};
