import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Logo } from '@/shared/ui';
import { cn } from '@/shared/lib/utils';
import type { FooterProps, FooterConfig } from './types';
import { DEFAULT_FOOTER_CONFIG } from './constants';

export const Footer: React.FC<FooterProps> = ({ config, className }) => {
  const { t } = useTranslation();

  // Dynamically resolve configuration with i18n support, or fallback to passed config / default
  const resolvedConfig: FooterConfig = config ?? {
    description: t('footer.description', { defaultValue: DEFAULT_FOOTER_CONFIG.description }),
    badges: (t('footer.badges', { returnObjects: true }) as string[]) || DEFAULT_FOOTER_CONFIG.badges,
    columns: [
      {
        title: t('footer.processTitle', { defaultValue: DEFAULT_FOOTER_CONFIG.columns[0]?.title }),
        links: DEFAULT_FOOTER_CONFIG.columns[0]?.links || [],
      },
      {
        title: t('footer.supportTitle', { defaultValue: DEFAULT_FOOTER_CONFIG.columns[1]?.title }),
        links: DEFAULT_FOOTER_CONFIG.columns[1]?.links || [],
      },
    ],
    contact: {
      title: t('footer.contactTitle', { defaultValue: DEFAULT_FOOTER_CONFIG.contact.title }),
      address: t('footer.address', { defaultValue: DEFAULT_FOOTER_CONFIG.contact.address }),
      hotline: t('footer.hotline', { defaultValue: DEFAULT_FOOTER_CONFIG.contact.hotline }),
      email: t('footer.email', { defaultValue: DEFAULT_FOOTER_CONFIG.contact.email }),
    },
    copyright: t('footer.copyright', { defaultValue: DEFAULT_FOOTER_CONFIG.copyright }),
    legalLinks: [
      { label: t('footer.privacyPolicy', { defaultValue: 'Bảo mật thông tin' }), href: '/privacy' },
      { label: t('footer.termsOfService', { defaultValue: 'Cam kết dịch vụ' }), href: '/terms' },
      { label: t('footer.iotRegulations', { defaultValue: 'Quy định IoT' }), href: '/iot-regulations' },
    ],
  };

  return (
    <footer className={cn('border-t border-border bg-slate-50/80 text-foreground font-sans', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1: Brand & Badges (takes 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="/" className="inline-flex items-center gap-2.5 focus:outline-none">
              <Logo size="sm" showText />
            </a>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              {resolvedConfig.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {resolvedConfig.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-border bg-card px-2.5 py-1 text-[10px] font-semibold text-muted-foreground shadow-2xs"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Col 2 & 3: Dynamic Nav Columns */}
          {resolvedConfig.columns.map((col) => (
            <div key={col.title} className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-muted-foreground hover:text-primary transition-colors leading-normal"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Col 4: Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {resolvedConfig.contact.title}
            </h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{resolvedConfig.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>{resolvedConfig.contact.hotline}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>{resolvedConfig.contact.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="mt-12 pt-6 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>{resolvedConfig.copyright}</p>
          <div className="flex items-center gap-4">
            {resolvedConfig.legalLinks.map((link, idx) => (
              <React.Fragment key={link.label}>
                {idx > 0 && <span className="text-border">|</span>}
                <a href={link.href} className="hover:text-primary transition-colors">
                  {link.label}
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
