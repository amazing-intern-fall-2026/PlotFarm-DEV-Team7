import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PATHS } from '../../app/routes/paths';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        {t('common.appName')}
      </h1>
      <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
        Smart Farm IoT Platform
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link
          to={PATHS.PUBLIC.PLOTS}
          className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 transition"
        >
          {t('nav.farms')}
        </Link>
        <Link
          to={PATHS.PUBLIC.CROPS}
          className="rounded-lg border border-gray-300 dark:border-gray-700 px-5 py-2.5 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          {t('nav.crops')}
        </Link>
      </div>
    </div>
  );
};
