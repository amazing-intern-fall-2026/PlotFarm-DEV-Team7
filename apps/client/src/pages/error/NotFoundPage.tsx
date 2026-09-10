import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PATHS } from '../../app/routes/paths';

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-8">
      <div className="max-w-md w-full text-center space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          {t('errors.notFoundTitle')}
        </h1>
        <p className="text-sm text-gray-500">
          {t('errors.notFoundDesc')}
        </p>
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
