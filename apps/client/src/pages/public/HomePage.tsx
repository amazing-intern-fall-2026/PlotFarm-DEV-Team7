import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PATHS } from '@/shared/config/paths';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center font-sans">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
        🌱 Nông nghiệp thực nghiệm công nghệ cao 4.0
      </div>

      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground">
        {t('common.appName')}
      </h1>
      <p className="mt-4 text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Nền tảng kết nối nông trại thông minh, cho phép thuê lô đất trải nghiệm, theo dõi sinh trưởng trực tiếp qua IoT camera và nhận nông sản sạch tận nhà.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <Link
          to={PATHS.PUBLIC.PLOTS}
          className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition"
        >
          {t('nav.explorePlots')}
        </Link>
        <Link
          to={PATHS.PUBLIC.ABOUT}
          className="rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition"
        >
          {t('nav.aboutUs')}
        </Link>
      </div>
    </div>
  );
};
